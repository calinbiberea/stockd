import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

export let firebaseApp: firebase.app.App;
export let db: firebase.firestore.Firestore;

export const setupFirebase = () => {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  db = firebaseApp.firestore();
};
