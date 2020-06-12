import { LocationData } from "../../util/googleMaps";
import { FindShopsResult } from "../../../functions/src/findShops/util";
import { ProductId, SafetyFeatureId } from "../../util/productsAndSafetyFeatures";

export type ShopSelectedScreen = "overview" | "safety" | "stock";

export interface ShopProps {
  locationData: LocationData;
  selectedScreen: ShopSelectedScreen;
  setSelectedScreen: (value: ShopSelectedScreen) => void;
  onBackClick: () => void;
}

export type EditShopResult = { success: false; reason: string } | { success: true };

export interface ShopHeaderProps {
  locationData: LocationData;
  noBackButton: boolean;
  onBackClick: () => void;
}

export type Stocks = Partial<Record<ProductId, number>>;

export type SafetyFeatures = Partial<Record<SafetyFeatureId, boolean>>;

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

export interface ShopStockProps {
  locationData: LocationData;
  stocks: Stocks;
}

export interface SafetyScoreProps {
  safetyScore: number;
  size?: "small" | "medium" | "large";
}

export interface StockItemProps {
  icon: string;
  name: string;
  value: number | undefined;
}

export interface SafetyItemProps {
  feature: SafetyFeatureId;
  value: boolean | undefined;
}
