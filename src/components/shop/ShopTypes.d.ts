import { LocationData } from "../../util/googleMaps";

export interface ShopProps {
  locationData: LocationData;
  edit: boolean;
  onBackClick: () => void;
}

export interface ShopHeaderProps {
  locationData: LocationData;
  noBackButton: boolean;
  onBackClick: () => void;
}

export interface Stocks {
  [name: string]: {
    icon: string;
    value: number | undefined;
  };
}

export interface SafetyFeatures {
  [name: string]: boolean | undefined;
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

export interface ShopEditProps {
  locationData: LocationData;
  stocks: Stocks;
  safetyScore: number;
  safetyFeatures: SafetyFeatures;
}

export interface StocksEditProps {
  locationData: LocationData;
  stocks: Stocks;
}

export interface SafetyEditProps {
  safetyScore: number;
  safetyFeatures: SafetyFeatures;
}

export interface SafetyScoreProps {
  safetyScore: number;
  setSafetyScore?: (newValue: number) => void;
  size?: "small" | "medium" | "large";
}

export interface StockItemProps {
  icon: string;
  name: string;
  value: number | undefined;
}

export interface SafetyItemProps {
  name: string;
  value: boolean | undefined;
}
