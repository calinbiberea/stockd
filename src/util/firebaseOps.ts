import { db } from "../firebase/firebaseApp";
import { geocodeByPlaceId, ShopData } from "./googleMaps";

const updateStock = async (
  shopData: ShopData,
  stockName: string,
  newValue: number
): Promise<void> => {
  const numberData: Record<string, number> = {};
  const queryData: Record<string, boolean> = {};

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

  const latLng = await geocodeByPlaceId(shopData.id);

  const location = {
    lat: latLng.lat(),
    lng: latLng.lng(),
  };

  queryData[stockName.toLowerCase()] = newValue > 25;
  numberData[stockName] = newValue;

  const query = {
    queryData,
    safetyScore,
  };

  const data = {
    shopData,
    location,
    query,
    safetyScore,
  };

  db.collection("shops")
    .doc(shopData.id)
    .set(data, { merge: true })
    .then(() => console.warn("successful"))
    .catch(() => console.error("unsuccessful"));
};

export default updateStock;
