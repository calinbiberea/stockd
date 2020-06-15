import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { pushUpdates, validate } from "./util";

export const pushSafetyUpdate = functions.https.onCall(async (data, context) => {
  const result = validate(data, context);
  if (result.response !== null) {
    return result.response;
  }
  const { uid, shopId, scores } = result;

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

  return await pushUpdates("safety", shopId, updates, data.updateLocationData);
});
