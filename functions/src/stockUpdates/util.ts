import * as admin from "firebase-admin";
import { Change } from "firebase-functions";
import * as https from "https";
import API_KEY from "../apiKey";
import DocumentSnapshot = admin.firestore.DocumentSnapshot;

type Timestamp = admin.firestore.Timestamp;

export const allowedScores = { stocks: [0, 50, 100], safety: [0, 100] };

export const formatDate = (millis: number): string => {
  const date = new Date(millis);
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const failReason = (reason: string) => ({ success: false, reason } as const);

// <editor-fold desc="User data types">

export interface Submission {
  scores: Record<string, number>;
  time: Timestamp;
}

export type StockSubmission = Submission;

export interface SafetySubmission extends Submission {
  rating: number;
}

export interface Entry<T> {
  prevScores?: Record<string, number>;
  submissions?: Record<string, T>;
}

export type StocksEntry = Entry<StockSubmission>;

export interface SafetyEntry extends Entry<SafetySubmission> {
  prevRating?: number;
}

// </editor-fold>

const sanitize = (num: number | undefined | null, defaultNum = 0): number => {
  if (typeof num !== "number" || isNaN(num)) {
    return defaultNum;
  }
  return num;
};

export const collectAverages = (
  submissions: Record<string, Submission>,
  prevs: Record<string, number> | undefined
): Record<string, number> => {
  const totals: Record<string, number> = {};
  const counts: Record<string, number> = {};

  for (const submission of [
    { scores: prevs !== undefined ? prevs : {} },
    ...Object.values(submissions),
  ]) {
    for (const [product, score] of Object.entries(submission.scores)) {
      totals[product] = sanitize(totals[product]) + sanitize(score);
      counts[product] = sanitize(counts[product]) + 1;
    }
  }
  return Object.entries(totals).reduce((acc, [product, total]) => {
    const average = total / counts[product];
    if (isNaN(average)) {
      return acc;
    }
    return {
      ...acc,
      [product]: average,
    };
  }, {});
};

export const scanForDifferences = (
  before: Record<string, Submission>,
  after: Record<string, Submission>
): boolean => {
  if (Object.keys(before).length !== Object.keys(after).length) {
    return true;
  }
  for (const [userId, submission] of Object.entries(after)) {
    if (
      before[userId] === undefined ||
      before[userId].time.toMillis() !== submission.time.toMillis()
    ) {
      return true;
    }
  }
  return false;
};

export const getBeforeAfter = <T extends Entry<S>, S extends Submission>(
  change: Change<DocumentSnapshot<T>>
): { before: T; after: T } | null => {
  const after = change.after.data() as T;

  if (after?.submissions === undefined) {
    return null;
  }

  const before = change.before.data() as T;
  if (
    before?.submissions !== undefined &&
    !scanForDifferences(before.submissions, after.submissions)
  ) {
    return null;
  }

  return { before, after };
};

// <editor-fold desc="Google maps">

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

// </editor-fold>
