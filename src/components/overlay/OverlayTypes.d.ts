import { LocationData } from "../../util/googleMaps";

export interface OverlayProps {
  placeId: string;
  closeOverlay: () => void;
  queryMap?: boolean;
  defaultToStock?: boolean;
  locationData?: LocationData | null;
}
