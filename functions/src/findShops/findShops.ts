import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { defaultNum, filterNotNull, FindShopsResults } from "./util";
import { getDistanceFromLatLonInKm } from "./getLatLngDistance";

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
