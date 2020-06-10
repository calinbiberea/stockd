export default interface MapProps {
  currentCenter: Location;
  onPlaceClick?: (placeId: string) => void;
  showGoogleMarkers?: boolean;
}

export type Location = {
  lat: number;
  lng: number;
};
