import { db } from "../firebase/firebaseApp";
import { geocodeByPlaceId, LocationData } from "./googleMaps";
import { NotifyFunc } from "./types";

const updateStock = async (
  locationData: LocationData,
  stockUpdates: Record<string, number>,
  notify?: NotifyFunc
): Promise<void> => {
  const displayedStocks: Record<string, number> = {};
  const queryStocks: Record<string, boolean> = {};
  const safetyFeatures: Record<string, boolean> = {
    masks: true,
    gloves: true,
    socialdistancing: true,
  };

  const latLng = await geocodeByPlaceId(locationData.id);

  const location = {
    lat: latLng.lat(),
    lng: latLng.lng(),
  };

  for (const [stockName, stockValue] of Object.entries(stockUpdates)) {
    displayedStocks[stockName.toLowerCase()] = stockValue;
    queryStocks[stockName.toLowerCase()] = stockValue > 25;
  }

  const displayed = {
    stocks: displayedStocks,
    safetyScore: 3.5,
  };

  const query = {
    stocks: queryStocks,
    safetyFeatures,
  };

  const data = {
    locationData,
    location,
    displayed,
    query,
  };

  db.collection("shops")
    .doc(locationData.id)
    .set(data, { merge: true })
    .then(() => {
      // eslint-disable-next-line no-console
      console.info("successful");
      if (notify !== undefined) {
        notify("Your submission has been received", { variant: "success" });
      }
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(`unsuccessful: ${e}`);
      if (notify !== undefined) {
        notify("Submission failed", { variant: "error" });
      }
    });
};

export default updateStock;
