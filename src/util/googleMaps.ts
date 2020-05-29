import { google, Loader } from "google-maps";
import envVars from "./envVars";
import { ShopData } from "../components/overlay/OverlayTypes";

let googleClient: google;
let placesService: google.maps.places.PlacesService;

const detailsRequestField = ["name", "photos"];

export const loadGoogleMapsScript = async (): Promise<void> => {
  googleClient = await new Loader(envVars.googleMapsKey.value, { libraries: ["places"] }).load();
  return;
};

export const setupGooglePlacesService = (map: google.maps.Map): void => {
  placesService = new googleClient.maps.places.PlacesService(map);
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
        };
        console.log(shopData.photoReference);
        resolve(shopData);
      } else {
        console.error(`Place details request failed with ${status}\n\n${place}`);
        resolve(null);
      }
    });
  });
