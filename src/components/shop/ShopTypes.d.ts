import { LocationData } from "../../util/googleMaps";

export type ShopSelectedScreen = "overview" | "safety" | "stock";

export interface ShopProps {
  locationData: LocationData;
  selectedScreen: ShopSelectedScreen;
  setSelectedScreen: (value: ShopSelectedScreen) => void;
}

export interface ShopHeaderProps {
  locationData: LocationData;
}

export interface Stocks {
  [name: string]: {
    icon: string;
    value: number | undefined;
  };
}

export interface SafetyFeatures {
  [name: string]: {
    icon: string;
    required: boolean | undefined;
  };
}

export interface ShopOverviewProps {
  locationData: LocationData;
  stocks: Stocks;
  safetyScore: number;
  safetyFeatures: SafetyFeatures;
}

export interface StocksOverviewProps {
  stocks: Stocks;
}

export interface SafetyOverviewProps {
  safetyScore: number;
  safetyFeatures: SafetyFeatures;
}

export interface ShopStockProps {
  locationData: LocationData;
  stocks: Stocks;
}

export interface SafetyScoreProps {
  safetyScore: number;
}

export interface StockItemProps {
  icon: string;
  name: string;
  value: number | undefined;
}
