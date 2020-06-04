import { db } from "../firebase/firebaseApp";

const updateStock = (shopId: string, stockName: string, newValue: number): void => {
  const numberData: Record<string, number> = {};
  const queryData: Record<string, boolean> = {};

  const query: Record<string, Record<string, boolean>> = {};

  const safetyScore: Record<string, boolean> = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
  };

  queryData[stockName.toLowerCase()] = newValue > 25;
  numberData[stockName] = newValue;

  query["stocks"] = queryData;
  query["safetyScore"] = safetyScore;

  const data: Record<string, Record<string, Record<string, boolean>>> = { query };

  db.collection("shops")
    .doc(shopId)
    .set(data, { merge: true })
    .then(() => console.warn("successful"))
    .catch(() => console.error("unsuccessful"));
};

export default updateStock;
