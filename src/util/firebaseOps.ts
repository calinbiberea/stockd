import { db } from "../firebase/firebaseApp";

const updateStock = (shopId: string, stockName: string, newValue: number): void => {
  /* todo: update breadStock to use stockName */

  db.collection("shops")
    .doc(shopId)
    .set({ breadStock: newValue }, { merge: true })
    .then(() => console.warn("successful"))
    .catch(() => console.error("unsuccessful"));
};

export default updateStock;
