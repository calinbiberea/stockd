import colors from "../res/colors";

export const ranks = [
  { score: 1000000, name: "OverStockd", color: colors.blue1 },
  { score: 500000, name: "Well-Stockd", color: colors.blue2 },
  { score: 250000, name: "Omniscient", color: colors.blue3 },
  { score: 100000, name: "Guardian", color: "#DAA520" },
  { score: 50000, name: "Guru", color: "#C0C0C0" },
  { score: 25000, name: "Scholar", color: "#CD7F32" },
  { score: 10000, name: "Professional", color: "#FF0000" },
  { score: 5000, name: "Leader", color: "#FF7F00" },
  { score: 1000, name: "Informer", color: "#FFFF00" },
  { score: 500, name: "Friendly Face", color: "#00FF00" },
  { score: 100, name: "Contributor", color: "#0000FF" },
  { score: 25, name: "Helper", color: "#2E2B5F" },
  { score: 5, name: "Rookie", color: "#8B00FF" },
  { score: 1, name: "Newbie", color: "#808080" },
  { score: 0, name: "Stranger", color: "#000000" },
] as const;

export const numRanks = ranks.length;

export const getRankData = (
  userScore: number
): { ix: number; rank: typeof ranks[number]; nextRank: typeof ranks[number] | null } => {
  const ix = ranks.findIndex(({ score: rankScore }) => userScore >= rankScore);
  const rank = ranks[ix];
  let nextRank = null;
  if (ix > 0) {
    nextRank = ranks[ix - 1];
  }
  return { ix, rank, nextRank };
};
