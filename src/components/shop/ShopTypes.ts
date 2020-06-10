import { LocationData } from "../../util/googleMaps";
import { FindShopsResult } from "../../../functions/src/findShops/util";

export interface ShopProps {
  locationData: LocationData;
  selectedScreen: ShopSelectedScreen;
  setSelectedScreen: (value: ShopSelectedScreen) => void;
}

export type ShopSelectedScreen = "overview" | "safety" | "stock";

export type EditShopResult = { success: false; reason: string } | { success: true };

export interface ShopHeaderProps {
  locationData: LocationData;
}

export interface Stocks {
  [name: string]: {
    icon: string;
    stock: number;
  };
}

export interface ShopOverviewProps {
  stocks: Stocks;
  locationData: LocationData;
}

export interface ShopStockProps {
  stocks: Stocks;
  locationData: LocationData;
}

export interface StockItemProps {
  icon: string;
  name: string;
  stock: number;
}
