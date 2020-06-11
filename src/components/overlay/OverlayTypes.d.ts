import { LocationData } from "../../util/googleMaps";

export interface OverlayProps {
  placeId: string;
  closeOverlay: () => void;
  queryMap?: boolean;
  edit?: boolean;
  locationData?: LocationData | null;
}
