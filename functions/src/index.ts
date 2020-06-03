import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const findShops = functions.https.onRequest(async (request, response) => {
  const products =
    request.query.products === "" ? [] : ((request.query.products || "") as string).split(",");
  const minSafetyRating = parseInt((request.query.minSafetyRating || "0") as string);
  const lat = parseFloat(request.query.lat as string);
  const long = parseFloat(request.query.long as string);
  const limit = parseInt((request.query.limit || "50") as string);
  const skip = parseInt((request.query.skip || "0") as string);

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
  const responseData = selection.map((snap) => ({ id: snap.id, ...snap.data() }));
  response.json({ success: true, data: responseData });
});
