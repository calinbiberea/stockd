import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { allowedScores, failReason, formatDate } from "./util";

export const pushStockUpdate = functions.https.onCall(async (data, context) => {
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
    if (!allowedScores.includes(i)) {
      return failReason("Invalid args");
    }
  }

  const date = formatDate(Date.now());

  const updates = {
    submissions: {
      [uid]: {
        time: admin.firestore.FieldValue.serverTimestamp(),
        scores,
      },
    },
  };

  const ref = admin.firestore().collection("shops").doc(shopId).collection("stocks").doc(date);

  try {
    await ref.set(updates, { merge: true });
    return { success: true };
  } catch (e) {
    return failReason(e.message);
  }
});
