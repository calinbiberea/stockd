import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { allowedScores, failReason, formatDate, getPlaceDetails, LocationData } from "./util";

export const pushSafetyUpdate = functions.https.onCall(async (data, context) => {
  // Check if logged in
  const uid = context.auth?.uid;
  if (uid === undefined) {
    return failReason("No user id (you might not be logged in)");
  }

  // Validate shopId
  const shopId: string | unknown = data.shopId;
  if (typeof shopId !== "string") {
    return failReason("Invalid args");
  }

  // Validate scores
  const scores: Record<string, number> = data.scores;
  if (Object.keys(scores).length === 0) {
    return { success: true };
  }
  for (const i of Object.values(scores)) {
    if (!allowedScores.safety.includes(i)) {
      return failReason("Invalid args");
    }
  }

  const date = formatDate(Date.now());
  const rating = data.rating;

  const updates = {
    submissions: {
      [uid]: {
        time: admin.firestore.FieldValue.serverTimestamp(),
        scores,
        ...(rating !== undefined ? { rating } : {}),
        // rating: data.rating ?? undefined,
      },
    },
  };

  let locationData: LocationData | null = null;
  if (data.updateLocationData) {
    locationData = await getPlaceDetails(shopId);
  }

  const shopRef = admin.firestore().collection("shops").doc(shopId);
  const submissionsRef = shopRef.collection("safety").doc(date);

  try {
    const batch = admin.firestore().batch();
    batch.set(submissionsRef, updates, { merge: true });
    if (locationData !== null) {
      batch.set(shopRef, { locationData: locationData }, { merge: true });
    }
    await batch.commit();
    return { success: true };
  } catch (e) {
    return failReason(e.message);
  }
});
