import { db } from "../firebase/firebaseApp";

const updateStock = (shopId: string, stockName: string, newValue: number): void => {
  /* todo: fix type */
  const data: any = {};
  data[`${stockName}Stock`] = newValue;

  db.collection("shops")
    .doc(shopId)
    .set(data, { merge: true })
    .then(() => console.warn("successful"))
    .catch(() => console.error("unsuccessful"));
};

export default updateStock;
