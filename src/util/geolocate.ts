import { NotifyFunc } from "./types";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

export const getCurrentLocation = (notify?: NotifyFunc): Promise<Position | null> =>
  new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (notify !== undefined) {
          notify("Successfully got your location", { variant: "success" });
        }
        resolve(position);
      },
      () => {
        if (notify !== undefined) {
          notify("Failed to get your location", { variant: "error" });
        }
        resolve(null);
      }
    );
  });

export const toggleGeolocationState = (
  setCurrentLocation: (loc: Position | null) => void,
  setUseCurrentLocation: (use: boolean) => void,
  enqueueSnackbar: NotifyFunc
) => async (enabled: boolean): Promise<void> => {
  let newUseCurrentLocation = enabled;
  if (enabled) {
    const maybeCurrentLocation = await getCurrentLocation(enqueueSnackbar);

    if (maybeCurrentLocation === null) {
      newUseCurrentLocation = false;
    }

    setCurrentLocation(maybeCurrentLocation);
  }

  setUseCurrentLocation(newUseCurrentLocation);
};

export const setLocationState = (
  useCurrentLocation: boolean,
  currentLocation: Position,
  selectedPlace: AutocompletePrediction
) => ():
  | { geolocated: true; lat: number; lng: number }
  | { geolocated: false; placeId: string } => {
  if (useCurrentLocation) {
    const coords = currentLocation.coords;

    return {
      geolocated: true as const,
      lat: coords.latitude,
      lng: coords.longitude,
    };
  } else {
    return {
      geolocated: false as const,
      placeId: selectedPlace.place_id,
    };
  }
};
