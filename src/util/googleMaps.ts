import { google, Loader } from "google-maps";
import { ShopData } from "../components/shop/ShopTypes";
import envVars from "./envVars";

let googleClient: google;
let placesService: google.maps.places.PlacesService;
let autocompleteService: google.maps.places.AutocompleteService;
let geocoder: google.maps.Geocoder;

const detailsRequestField = ["name", "photos", "address_components"];

export const loadGoogleMapsScript = async (): Promise<void> => {
  googleClient = await new Loader(envVars.googleMapsKey.value, { libraries: ["places"] }).load();
  return;
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

export const getInfoForPlace = (placeId: string): Promise<ShopData | null> =>
  new Promise((resolve) => {
    placesService.getDetails({ placeId, fields: detailsRequestField }, (place, status) => {
      if (status === googleClient.maps.places.PlacesServiceStatus.OK) {
        const shopData = {
          name: place.name,
          id: placeId,
          photoReference: place.photos
            ? place.photos.length > 0
              ? place.photos[0].getUrl({ maxWidth: 500 })
              : null
            : null,
          roadName:
            place.address_components?.find((component) => component.types.includes("route"))
              ?.long_name ?? null,
        };
        resolve(shopData);
      } else {
        console.error(`Place details request failed with ${status}\n\n${place}`);
        resolve(null);
      }
    });
  });

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
