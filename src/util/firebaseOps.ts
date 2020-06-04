import { db } from "../firebase/firebaseApp";
import { geocodeByPlaceId, LocationData } from "./googleMaps";

const updateStock = async (
  locationData: LocationData,
  stockUpdates: Record<string, number>
): Promise<void> => {
  const displayedStocks: Record<string, number> = {};
  const queryStocks: Record<string, boolean> = {};
  const safetyScore: Record<string, boolean> = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
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
    safetyScore,
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
    .then(() => console.warn("successful"))
    .catch(() => console.error("unsuccessful"));
};

export default updateStock;
