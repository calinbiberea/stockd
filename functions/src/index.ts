import * as admin from "firebase-admin";
import findShops from "./findShops";
import { pushStockUpdate } from "./stockUpdates/pushStockUpdate";
import { onStockUpdate } from "./stockUpdates/onStockUpdate";

admin.initializeApp();

module.exports = {
  findShops,
  pushStockUpdate,
  onStockUpdate,
};
