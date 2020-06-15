import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  collectAverages,
  collectBooleans,
  getBeforeAfter,
  getDateStrings,
  SafetyEntry,
  SafetySubmission,
} from "./util";

type DocumentSnapshot<T> = admin.firestore.DocumentSnapshot<T>;
type Change<T> = functions.Change<T>;

export const onSafetyUpdate = functions.firestore
  .document("shops/{shopId}/safety/{date}")
  .onWrite(async (change: Change<DocumentSnapshot<SafetyEntry>>, context) => {
    const shopId = context.params.shopId as string;

    const beforeAfter = getBeforeAfter<SafetyEntry, SafetySubmission>(change);
    if (beforeAfter === null) {
      return;
    }
    const { after } = beforeAfter;

    const submissions = after.submissions as Record<string, SafetySubmission>;
    const averages = collectAverages(submissions, after.prevScores);
    const ratings = [
      after.prevRating,
      ...Object.values(submissions).map((submission) => submission?.rating),
    ].filter((rating) => rating !== undefined && !isNaN(rating)) as number[];
    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    const booleans = collectBooleans(averages);

    const { today, tomorrow } = getDateStrings();

    const batch = admin.firestore().batch();

    const shopRef = admin.firestore().collection("shops").doc(shopId);
    batch.set(
      shopRef,
      {
        displayed: {
          safety: averages,
          ...(ratings.length > 0 ? { safetyRating: averageRating } : {}),
        },
        query: {
          safety: booleans,
        },
        safetyLastUpdated: today,
      },
      { merge: true }
    );

    const tomorrowSubmissionRef = shopRef.collection("safety").doc(tomorrow);
    batch.set(
      tomorrowSubmissionRef,
      { prevScores: averages, prevRating: averageRating },
      { merge: true }
    );

    await batch.commit();
  });
