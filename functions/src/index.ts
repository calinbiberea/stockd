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

interface FindShopsResult {
  id: string;
  distance: number;
  [p: string]: unknown;
}

type FindShopsResults = { success: false } | { success: true; results: FindShopsResult[] };

const defaultNum = <T extends number>(v: T, defaultV: T) => (isNaN(v) ? defaultV : v);

const filterNotNull = <T>(arr: (T | null)[]): T[] =>
  (arr.filter((item) => item !== null) as unknown) as T[];

// noinspection JSUnusedGlobalSymbols
export const findShops = functions.https.onCall(
  async (data): Promise<FindShopsResults> => {
    const products = data.products === "" ? [] : (data.products as string).split(",");
    const safetyFeatures =
      data.safetyFeatures === "" ? [] : (data.safetyFeatures as string).split(",");
    const lat = parseFloat(data.lat);
    const lng = parseFloat(data.lng);
    const limit = Math.min(defaultNum(parseInt(data.limit), 50), 50);
    const skip = defaultNum(parseInt(data.skip), 0);
    const radius = Math.min(defaultNum(parseFloat(data.radius), 50), 50);

    for (const i of [lat, lng]) {
      if (isNaN(i)) {
        return { success: false };
      }
    }

    const distanceFromShop = (shop: FirebaseFirestore.QueryDocumentSnapshot): number | null => {
      const shopLat = shop.data()?.location?.lat;
      const shopLong = shop.data()?.location?.lng;

      if (typeof shopLat !== "number" || typeof shopLong !== "number") {
        return null;
      }

      return getDistanceFromLatLonInKm(lat, lng, shopLat, shopLong);
    };

    let query:
      | FirebaseFirestore.CollectionReference
      | FirebaseFirestore.Query = admin.firestore().collection("shops");

    for (const product of products) {
      query = query.where(`query.stocks.${product}`, "==", true);
    }

    for (const feature of safetyFeatures) {
      query = query.where(`query.safetyFeatures.${feature}`, "==", true);
    }

    const initialResults = (await query.get()).docs;
    const resultsWithDistance = filterNotNull(
      initialResults.map((snap) => {
        const distance = distanceFromShop(snap);

        if (distance === null) {
          return null;
        }

        return {
          ...snap.data(),
          id: snap.id,
          distance,
        };
      })
    );
    const resultsWithinRadius = resultsWithDistance.filter((result) => result.distance <= radius);
    const selectedResults = resultsWithinRadius.slice(skip, skip + limit);
    return { success: true, results: selectedResults };
  }
);
