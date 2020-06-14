import { LocationData } from "../../util/googleMaps";

export type SortBy = "distance" | "safetyScore";

export interface ShopResultsProps {
  onBackClick: () => void;
  filters: {
    editShop: boolean;
    nameFilter: boolean;
    products: string[];
    safetyFeatures: string[];
    maxDistance: number;
  };
  location: { geolocated: true; lat: number; lng: number } | { geolocated: false; placeId: string };
}

export type View = "list" | "map";

export interface ShopResultsHeaderProps {
  onBackClick: () => void;
  view: View;
  setView: (View) => void;
  setSortBy: (SortBy) => void;
}

export interface ShopListProps {
  shopList: DBShopData[];
  sortBy: SortBy;
  onShopSelect: (LocationData) => void;
}

export interface ShopMapProps {
  shopList: DBShopData[];
  onShopSelect: (LocationData) => void;
  userPos: {
    lat: number;
    lng: number;
  };
  maxDistance: number;
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
