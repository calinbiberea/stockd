import * as https from "https";
import API_KEY from "../apiKey";

export interface LocationData {
  id: string;
  name: string;
  photoReference: string | null;
  road: string | null;
  lat: number;
  lng: number;
}

interface PlaceDetailsResponse {
  status: string;
  result: {
    name: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    photos: {
      photo_reference: string;
    }[];
    address_components: {
      long_name: string;
      types: string[];
    }[];
  };
}

const ENDPOINT = "https://maps.googleapis.com/maps/api/place/details/json";
const FIELDS = ["name", "photos", "address_components", "geometry"];

const placeDetailsURL = (placeId: string): string => {
  const params = { place_id: placeId, key: API_KEY, fields: FIELDS.join(",") };
  const paramString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return `${ENDPOINT}?${paramString}`;
};

// from https://stackoverflow.com/questions/6968448/where-is-body-in-a-nodejs-http-get-response
const httpsGet = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });

export const getPlaceDetails = async (placeId: string): Promise<LocationData | null> => {
  const url = placeDetailsURL(placeId);
  const rawResponse = await httpsGet(url);
  const response = JSON.parse(rawResponse) as PlaceDetailsResponse;
  if (response.status !== "OK") {
    console.error(url + "\n" + rawResponse);
    return null;
  }

  return {
    name: response.result.name,
    id: placeId,
    photoReference: response.result.photos
      ? response.result.photos.length > 0
        ? response.result.photos[0].photo_reference
        : null
      : null,
    road:
      response.result.address_components?.find((component) => component.types.includes("route"))
        ?.long_name ?? null,
    lat: response.result.geometry.location.lat,
    lng: response.result.geometry.location.lng,
  };
};
