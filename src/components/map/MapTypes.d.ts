export default interface MapProps {
  currentCenter: Location;
  onPlaceClick: (placeId: string) => void;
}

export type Location = {
  lat: number;
  lng: number;
};
