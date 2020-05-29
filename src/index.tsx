import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { firebaseConfig } from "./firebase/firebaseConfig";
import { missingEnvVars } from "./util/envVars";
import MissingEnvVar from "./components/errorScreens/MissingEnvVar";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

ReactDOM.render(
  <React.StrictMode>
    {missingEnvVars.length === 0 ? <App /> : <MissingEnvVar vars={missingEnvVars} />}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
