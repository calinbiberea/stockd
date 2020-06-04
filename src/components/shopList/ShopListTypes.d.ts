import { LocationData } from "../../util/googleMaps";

export interface ShopListProps {
  onBackClick: () => void;
  filters: {
    products: string[];
    minSafetyScore: number;
  };
  location: { geolocated: true; lat: number; lng: number } | { geolocated: false; placeId: string };
}

export interface ShopListItemProps {
  shopData: DBShopData;
  startTime: string;
  endTime: string;
  onGetDetailsClick: (locationData: LocationData) => void;
}

export interface DBShopData {
  id: string;
  distance: number;
  locationData: LocationData;
}

export interface FindShopsResult {
  success: true;
  data: DBShopData[];
}
