import envVars from "../util/envVars";

export const firebaseConfig = {
  apiKey: envVars.firebaseKey.value,
  authDomain: "stockd-052020.firebaseapp.com",
  databaseURL: "https://stockd-052020.firebaseio.com",
  projectId: "stockd-052020",
  storageBucket: "stockd-052020.appspot.com",
  messagingSenderId: "323774303383",
  appId: "1:323774303383:web:cee719d5d75b68b8946dd2",
  measurementId: "G-MWW6M568QL",
};
