import { LocationData } from "../../util/googleMaps";

export interface ShopProps {
  locationData: LocationData;
  selectedScreen: ShopSelectedScreen;
  setSelectedScreen: (value: ShopSelectedScreen) => void;
}

export type ShopSelectedScreen = "overview" | "safety" | "stock";

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
