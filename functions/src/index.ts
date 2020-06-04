import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Latitude/longitude distance calculation functions
// Adapted from https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
// <editor-fold>

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const getDistanceFromLatLonInKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// </editor-fold>

// noinspection JSUnusedGlobalSymbols
export const findShops = functions.https.onCall(async (data) => {
  const products = data.products === "" ? [] : (data.products as string).split(",");
  const minSafetyRating = parseInt((data.minSafetyRating || "0") as string);
  const lat = parseFloat(data.lat as string);
  const lng = parseFloat(data.lng as string);
  const limit = parseInt((data.limit || "50") as string);
  const skip = parseInt((data.skip || "0") as string);

  const distanceFromShop = (shop: FirebaseFirestore.QueryDocumentSnapshot): number => {
    const shopLat = shop.data().location.lat as number;
    const shopLong = shop.data().location.lng as number;

    return getDistanceFromLatLonInKm(lat, lng, shopLat, shopLong);
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

  const initialResults = (await query.get()).docs;
  const mappedResults = initialResults.map((snap) => ({
    ...snap.data(),
    id: snap.id,
    distance: distanceFromShop(snap),
  }));
  const sortedResults = mappedResults.sort((a, b) => a.distance - b.distance);
  return sortedResults.slice(skip, skip + limit);
});
