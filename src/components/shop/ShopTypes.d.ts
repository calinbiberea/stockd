import { LocationData } from "../../util/googleMaps";
import { ProductId, SafetyFeatureId } from "../../util/productsAndSafetyFeatures";

export interface ShopProps {
  locationData: LocationData;
  edit: boolean;
  onBackClick: () => void;
}

export type EditResult = { success: false; reason: string } | { success: true };

export interface ShopHeaderProps {
  locationData: LocationData;
  noBackButton: boolean;
  onBackClick?: () => void;
}

export type Stocks = Partial<Record<ProductId, number>>;

export type SafetyFeatures = Partial<Record<SafetyFeatureId, number>>;

export interface ShopOverviewProps {
  locationData: LocationData;
  stocks: Stocks;
  safetyScore: number;
  usedSafetyFeatures: SafetyFeatures;
}

export interface StocksOverviewProps {
  stocks: Stocks;
}

export interface SafetyOverviewProps {
  safetyScore: number;
  usedSafetyFeatures: SafetyFeatures;
}

export interface ShopEditProps {
  locationData: LocationData;
  stocks: Stocks;
  safetyScore: number;
  usedSafetyFeatures: SafetyFeatures;
}

export interface StocksEditProps {
  locationData: LocationData;
  stocks: Stocks;
}

export interface SafetyEditProps {
  locationData: LocationData;
  safetyScore: number;
  usedSafetyFeatures: SafetyFeatures;
}

export interface SafetyScoreProps {
  safetyScore: number;
  setSafetyScore?: (newValue: number) => void;
  size?: "small" | "medium" | "large";
  updated?: boolean;
}

export interface StockItemProps {
  productId: string;
  value: number | undefined;
}

export interface SafetyItemProps {
  feature: SafetyFeatureId;
  value: number | undefined;
}
