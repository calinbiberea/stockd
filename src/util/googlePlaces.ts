import { ShopData } from "../components/shop/ShopTypes";

export const getInfoForPlace = (placeId: string): Promise<ShopData> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: placeId, id: placeId });
    }, 1000);
  });
