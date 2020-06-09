import * as admin from "firebase-admin";

type Timestamp = admin.firestore.Timestamp;

export const allowedScores = [0, 50, 100];

export const formatDate = (millis: number): string => {
  const date = new Date(millis);
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getFullYear().toString().padStart(2, "0");
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

export const collectAverages = (
  submissions: Submissions,
  prevs: Record<string, number> | undefined
): Record<string, number> => {
  const prevTotals = prevs;
  const prevCounts = Object.keys({ ...prevs }).reduce((acc, cur) => ({ ...acc, [cur]: 1 }), {});

  const totals: Record<string, number> = { ...prevTotals };
  const counts: Record<string, number> = { ...prevCounts };

  for (const submission of Object.values(submissions)) {
    for (const [product, score] of Object.entries(submission.scores)) {
      totals[product] = totals[product] + score;
      counts[product] = counts[product] + 1;
    }
  }
  const averages: Record<string, number> = Object.entries(totals).reduce(
    (acc, [product, total]) => ({
      ...acc,
      [product]: total / averages[product],
    }),
    {}
  );

  return averages;
};

export const scanForDifferences = (before: Submissions, after: Submissions) => {
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
