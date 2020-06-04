import { google, Loader } from "google-maps";
import envVars from "./envVars";

export interface LocationData {
  name: string;
  id: string;
  photo: string | null;
  road: string | null;
}

let googleClient: google;
let placesService: google.maps.places.PlacesService;
let geocoder: google.maps.Geocoder;

const detailsRequestField = ["name", "photos", "address_components"];

export const loadGoogleMapsScript = async (): Promise<void> => {
  googleClient = await new Loader(envVars.googleMapsKey.value, { libraries: ["places"] }).load();
  return;
};

export const setupGooglePlacesService = (map: google.maps.Map): void => {
  placesService = new googleClient.maps.places.PlacesService(map);
};

export const setupGoogleGeocoder = (): void => {
  geocoder = new googleClient.maps.Geocoder();
};

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
          road:
            place.address_components?.find((component) => component.types.includes("route"))
              ?.long_name ?? null,
        };

        resolve(locationData);
      } else {
        console.error(`Place details request failed with ${status}\n\n${place}`);

        resolve(null);
      }
    })
  );
