import * as admin from "firebase-admin";
import findShops from "./findShops";

admin.initializeApp();

module.exports = {
  findShops,
};
