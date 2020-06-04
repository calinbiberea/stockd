export interface ShopListProps {
  onBackClick: () => void;
  filters: {
    products: string[];
    minSafetyScore: number;
  };
  location: { geolocated: true; lat: number; lng: number } | { geolocated: false; placeId: string };
}

export interface LocationData {
  id: string;
  name: string;
  photo: string;
  road: string;
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
