import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const findShops = functions.https.onCall(async (data, context) => {
  const products = data.products === "" ? [] : (data.products as string).split(",");
  const minSafetyRating = parseInt((data.minSafetyRating || "0") as string);
  const lat = parseFloat(data.lat as string);
  const long = parseFloat(data.long as string);
  const limit = parseInt((data.limit || "50") as string);
  const skip = parseInt((data.skip || "0") as string);

  const distanceFromShop = (shop: FirebaseFirestore.QueryDocumentSnapshot): number => {
    const shopLat = shop.data().location.lat as number;
    const shopLong = shop.data().location.long as number;

    return Math.sqrt(Math.pow(shopLat - lat, 2) + Math.pow(shopLong - long, 2));
  };

  let query:
    | FirebaseFirestore.CollectionReference
    | FirebaseFirestore.Query = admin.firestore().collection("shops");

  if (minSafetyRating > 0) {
    query = query.where(`query.safetyScore.${minSafetyRating}`, "==", true);
  }

  for (const product of products) {
    query = query.where(`query.stocks.${product}`, "==", true);
  }

  const results = (await query.get()).docs;
  const sortedResults = results.sort((a, b) => distanceFromShop(a) - distanceFromShop(b));
  const selection = sortedResults.slice(skip, skip + limit);
  return selection.map((snap) => ({ id: snap.id, ...snap.data() }));
});
