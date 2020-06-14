import * as admin from "firebase-admin";
import { Change } from "firebase-functions";
import { CallableContext } from "firebase-functions/lib/providers/https";
import { getPlaceDetails, LocationData } from "./googleMaps";

type DocumentSnapshot<T> = admin.firestore.DocumentSnapshot<T>;

type Timestamp = admin.firestore.Timestamp;

export const allowedScores = { stocks: [0, 50, 100], safety: [0, 100] };

export const formatDate = (millis: number): string => {
  const date = new Date(millis);
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const failReason = (reason: string) => ({ success: false, reason } as const);

export type PushResponse = { success: false; reason: string } | { success: true };

// <editor-fold desc="User data types">

export interface Submission {
  scores: Record<string, number>;
  time: Timestamp;
}

export type StockSubmission = Submission;

export interface SafetySubmission extends Submission {
  rating: number;
}

export interface Entry<T> {
  prevScores?: Record<string, number>;
  submissions?: Record<string, T>;
}

export type StocksEntry = Entry<StockSubmission>;

export interface SafetyEntry extends Entry<SafetySubmission> {
  prevRating?: number;
}

// </editor-fold>

const sanitize = (num: number | undefined | null, defaultNum = 0): number => {
  if (typeof num !== "number" || isNaN(num)) {
    return defaultNum;
  }
  return num;
};

export const collectAverages = (
  submissions: Record<string, Submission>,
  prevs: Record<string, number> | undefined
): Record<string, number> => {
  const totals: Record<string, number> = {};
  const counts: Record<string, number> = {};

  for (const submission of [
    { scores: prevs !== undefined ? prevs : {} },
    ...Object.values(submissions),
  ]) {
    for (const [product, score] of Object.entries(submission.scores)) {
      totals[product] = sanitize(totals[product]) + sanitize(score);
      counts[product] = sanitize(counts[product]) + 1;
    }
  }
  return Object.entries(totals).reduce((acc, [product, total]) => {
    const average = total / counts[product];
    if (isNaN(average)) {
      return acc;
    }
    return {
      ...acc,
      [product]: average,
    };
  }, {});
};

export const scanForDifferences = (
  before: Record<string, Submission>,
  after: Record<string, Submission>
): boolean => {
  if (Object.keys(before).length !== Object.keys(after).length) {
    return true;
  }
  for (const [userId, submission] of Object.entries(after)) {
    if (
      before[userId] === undefined ||
      before[userId].time.toMillis() !== submission.time.toMillis()
    ) {
      return true;
    }
  }
  return false;
};

export const getBeforeAfter = <T extends Entry<S>, S extends Submission>(
  change: Change<DocumentSnapshot<T>>
): { before: T; after: T } | null => {
  const after = change.after.data() as T;

  if (after?.submissions === undefined) {
    return null;
  }

  const before = change.before.data() as T;
  if (
    before?.submissions !== undefined &&
    !scanForDifferences(before.submissions, after.submissions)
  ) {
    return null;
  }

  return { before, after };
};

export const validate = (
  data: Record<string, unknown>,
  context: CallableContext
):
  | { response: PushResponse }
  | { response: null; uid: string; shopId: string; scores: Record<string, number> } => {
  // Check if logged in
  const uid = context.auth?.uid;
  if (uid === undefined) {
    return { response: failReason("No user id (you might not be logged in)") };
  }

  // Validate shopId
  const shopId: string | unknown = data.shopId;
  if (typeof shopId !== "string") {
    return { response: failReason("Invalid args") };
  }

  // Validate scores
  if (data.scores === null || data.scors === undefined) {
    return { response: failReason("Invalid args") };
  }
  const scores: Record<string, number> = data.scores as Record<string, number>;
  if (Object.keys(scores).length === 0) {
    return { response: { success: true } };
  }
  for (const i of Object.values(scores)) {
    if (!allowedScores.safety.includes(i)) {
      return { response: failReason("Invalid args") };
    }
  }

  return { response: null, uid, shopId, scores };
};

export const pushUpdates = async (
  type: "stocks" | "safety",
  shopId: string,
  updates: unknown,
  updateLocationData: boolean
): Promise<PushResponse> => {
  const date = formatDate(Date.now());

  let locationData: LocationData | null = null;
  if (updateLocationData) {
    locationData = await getPlaceDetails(shopId);
  }

  const shopRef = admin.firestore().collection("shops").doc(shopId);
  const submissionsRef = shopRef.collection(type).doc(date);

  try {
    const batch = admin.firestore().batch();
    batch.set(submissionsRef, updates, { merge: true });
    if (locationData !== null) {
      batch.set(shopRef, { locationData: locationData }, { merge: true });
    }
    await batch.commit();
    return { success: true as const };
  } catch (e) {
    return failReason(e.message);
  }
};
