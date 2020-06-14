import { google, Loader } from "google-maps";
import envVars from "./envVars";

export interface LocationData {
  name: string;
  id: string;
  photo: string | null;
  photoReference: string | null;
  road: string | null;
  lat: number;
  lng: number;
  updateLocationData?: boolean;
}

let googleClient: google;
let placesService: google.maps.places.PlacesService;
let autocompleteService: google.maps.places.AutocompleteService;
let geocoder: google.maps.Geocoder;

const detailsRequestField = ["name", "photos", "address_components", "geometry"];

export const loadGoogleMapsScript = async (): Promise<void> => {
  googleClient = await new Loader(envVars.googleMapsKey.value, { libraries: ["places"] }).load();
  return;
};

export const setupGooglePlacesServiceEdit = (): void => {
  const container = document.getElementById("pseudoMap") as HTMLDivElement;
  placesService = new googleClient.maps.places.PlacesService(container);
};

export const setupGooglePlacesService = (map: google.maps.Map): void => {
  placesService = new googleClient.maps.places.PlacesService(map);
};

export const setupGoogleAutocompleteService = (): void => {
  autocompleteService = new googleClient.maps.places.AutocompleteService();
};

export const setupGoogleGeocoder = (): void => {
  geocoder = new googleClient.maps.Geocoder();
};

export const getLocationDataByPlaceId = (placeId: string): Promise<LocationData | null> =>
  new Promise((resolve) =>
    placesService.getDetails({ placeId, fields: detailsRequestField }, (place, status) => {
      if (status === googleClient.maps.places.PlacesServiceStatus.OK) {
        const locationData = {
          name: place.name,
          id: placeId,
          photo: place.photos
            ? place.photos.length > 0
              ? place.photos[0].getUrl({ maxWidth: 500 })
              : null
            : null,
          photoReference: null,
          road:
            place.address_components?.find((component) => component.types.includes("route"))
              ?.long_name ?? null,
          lat: place.geometry?.location.lat() as number,
          lng: place.geometry?.location.lng() as number,
        };
        resolve(locationData);
      } else {
        console.error(`Place details request failed with ${status}\n\n${place}`);

        resolve(null);
      }
    })
  );

export const getPlacePredictions = (
  request: { input: string },
  callback: (results?: google.maps.places.AutocompletePrediction[]) => void
): void => autocompleteService.getPlacePredictions(request, callback);

export const geocodeByPlaceId = (placeId: string): Promise<google.maps.LatLng> =>
  new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === googleClient.maps.GeocoderStatus.OK) {
        const data = results[0].geometry.location;
        resolve(data);
      } else {
        reject(status);
      }
    });
  });

// Used for retrieving places
export const getPlacesInRadius = (
  location: { lat: number; lng: number },
  radius: number
): Promise<LocationData[] | null> => {
  const latLng = new googleClient.maps.LatLng(location.lat, location.lng);
  return new Promise((resolve) =>
    placesService.nearbySearch(
      { location: latLng, radius: radius * 1000, type: "grocery_or_supermarket" },
      (places, status) => {
        if (status === googleClient.maps.places.PlacesServiceStatus.OK) {
          const locations: LocationData[] = [];

          places.forEach((item) => {
            const locationData = {
              name: item.name,
              id: item.place_id,
              photo: item.photos
                ? item.photos.length > 0
                  ? item.photos[0].getUrl({ maxWidth: 500 })
                  : null
                : null,
              photoReference: null,
              road:
                item.address_components?.find((component) => component.types.includes("route"))
                  ?.long_name ?? null,
              lat: item.geometry?.location.lat() as number,
              lng: item.geometry?.location.lng() as number,
            } as LocationData;

            locations.push(locationData);
          });

          resolve(locations);
        } else {
          console.error(`Place details request failed with ${status}\n\n${places}`);

          resolve(null);
        }
      }
    )
  );
};
