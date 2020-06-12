import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { collectAverages, formatDate, scanForDifferences, StocksEntry } from "./util";

type DocumentSnapshot<T> = admin.firestore.DocumentSnapshot<T>;
type Change<T> = functions.Change<T>;

export const onStockUpdate = functions.firestore
  .document("shops/{shopId}/stocks/{date}")
  .onWrite(async (change: Change<DocumentSnapshot<StocksEntry>>, context) => {
    const shopId = context.params.shopId as string;
    const after = change.after.data() as StocksEntry;

    if (after?.submissions === undefined) {
      return;
    }

    const before = change.before.data() as StocksEntry;
    if (
      before?.submissions !== undefined &&
      !scanForDifferences(before.submissions, after.submissions)
    ) {
      return;
    }

    const submissions = after.submissions;
    const averages = collectAverages(submissions, after.prevScores);

    const batch = admin.firestore().batch();

    const shopRef = admin.firestore().collection("shops").doc(shopId);
    batch.set(shopRef, { displayed: { stocks: averages } }, { merge: true });

    const tomorrow = formatDate(Date.now() + 86400000);
    const tomorrowSubmissionRef = shopRef.collection("stocks").doc(tomorrow);
    batch.set(tomorrowSubmissionRef, { prevScores: averages }, { merge: true });

    await batch.commit();
  });
