import * as admin from "firebase-admin";
import findShops from "./findShops";
import { pushStockUpdate, pushSafetyUpdate, onStockUpdate, onSafetyUpdate } from "./updates";

admin.initializeApp();

module.exports = {
  findShops,
  pushStockUpdate,
  pushSafetyUpdate,
  onStockUpdate,
  onSafetyUpdate,
};
