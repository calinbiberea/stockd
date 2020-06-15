import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  collectAverages,
  collectBooleans,
  getBeforeAfter,
  getDateStrings,
  StocksEntry,
  StockSubmission,
} from "./util";

type DocumentSnapshot<T> = admin.firestore.DocumentSnapshot<T>;
type Change<T> = functions.Change<T>;

export const onStockUpdate = functions.firestore
  .document("shops/{shopId}/stocks/{date}")
  .onWrite(async (change: Change<DocumentSnapshot<StocksEntry>>, context) => {
    const shopId = context.params.shopId as string;

    const beforeAfter = getBeforeAfter<StocksEntry, StockSubmission>(change);
    if (beforeAfter === null) {
      return;
    }
    const { after } = beforeAfter;

    const submissions = after.submissions as Record<string, StockSubmission>;
    const averages = collectAverages(submissions, after.prevScores);
    const booleans = collectBooleans(averages);

    const { today, tomorrow } = getDateStrings();

    const batch = admin.firestore().batch();

    const shopRef = admin.firestore().collection("shops").doc(shopId);
    batch.set(
      shopRef,
      { displayed: { stocks: averages }, query: { stocks: booleans }, stockLastUpdated: today },
      { merge: true }
    );

    const tomorrowSubmissionRef = shopRef.collection("stocks").doc(tomorrow);
    batch.set(tomorrowSubmissionRef, { prevScores: averages }, { merge: true });

    await batch.commit();
  });
