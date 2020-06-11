import { LocationData } from "../../util/googleMaps";

export type SortBy = "distance" | "safetyScore";

export interface ShopListProps {
  onBackClick: () => void;
  filters: {
    nameFilter: boolean;
    shopName: string;
    products: string[];
    safetyFeatures: string[];
    maxDistance: number;
  };
  location: { geolocated: true; lat: number; lng: number } | { geolocated: false; placeId: string };
}

export interface ShopListItemProps {
  shopData: DBShopData;
  startTime: string;
  endTime: string;
  onGetDetailsClick: (locationData: LocationData) => void;
}

export interface SortByMenuProps {
  setSortBy: (value: SortBy) => void;
  className?: string;
}

export interface DBShopData {
  id: string;
  distance: number;
  locationData: LocationData;
  [k: string]: unknown;
}

export type FindShopsResult =
  | {
      success: true;
      results: DBShopData[];
    }
  | { success: false };
