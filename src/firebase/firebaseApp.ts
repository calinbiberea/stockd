import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/functions";
import { firebaseConfig } from "./firebaseConfig";

export let firebaseApp: firebase.app.App;
export let db: firebase.firestore.Firestore;
export let functions: firebase.functions.Functions;
export let findShops: firebase.functions.HttpsCallable;

export const setupFirebase = (): void => {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  db = firebaseApp.firestore();
  functions = firebaseApp.functions();
  findShops = functions.httpsCallable("findShops");
};
