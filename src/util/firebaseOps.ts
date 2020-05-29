import { db } from "../index";

const updateStock = (shopId: string, stockName: string, newValue: number): void => {
  db.collection("shops")
    .doc(shopId)
    .update(`${stockName}stock`, newValue)
    .then(() => console.warn("successful"))
    .catch(() => console.error("unsuccessful"));
};

export default updateStock;
