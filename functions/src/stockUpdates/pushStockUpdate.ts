import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { pushUpdates, validate } from "./util";

export const pushStockUpdate = functions.https.onCall(async (data, context) => {
  const result = validate(data, context);
  if (result.response !== null) {
    return result.response;
  }
  const { uid, shopId, scores } = result;

  const updates = {
    submissions: {
      [uid]: {
        time: admin.firestore.FieldValue.serverTimestamp(),
        scores,
      },
    },
  };

  return await pushUpdates("stocks", shopId, updates, data.updateLocationData);
});
