import { LocationData } from "../../util/googleMaps";

export interface OverlayProps {
  placeId: string;
  closeOverlay: () => void;
  edit?: boolean;
  locationData?: LocationData | null;
}
