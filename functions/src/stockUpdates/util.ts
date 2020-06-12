import * as admin from "firebase-admin";

type Timestamp = admin.firestore.Timestamp;

export const allowedScores = [0, 50, 100];

export const formatDate = (millis: number): string => {
  const date = new Date(millis);
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDay().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const failReason = (reason: string) => ({ success: false, reason });

export interface Submissions {
  [userId: string]: {
    scores: Record<string, number>;
    time: Timestamp;
  };
}

export interface StocksEntry {
  prevScores?: Record<string, number>;
  submissions?: Submissions;
}

const sanitize = (num: number | undefined | null, defaultNum = 0): number => {
  if (typeof num !== "number" || isNaN(num)) {
    return defaultNum;
  }
  return num;
};

export const collectAverages = (
  submissions: Submissions,
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

export const scanForDifferences = (before: Submissions, after: Submissions): boolean => {
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
