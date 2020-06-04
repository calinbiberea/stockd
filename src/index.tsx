import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { missingEnvVars } from "./util/envVars";
import MissingEnvVar from "./components/errorScreens/MissingEnvVar";
import { setupFirebase } from "./firebase/firebaseApp";
import {
  loadGoogleMapsScript,
  setupGoogleAutocompleteService,
  setupGoogleGeocoder,
} from "./util/googleMaps";

const runApp = async () => {
  setupFirebase();
  await loadGoogleMapsScript();
  setupGoogleAutocompleteService();
  setupGoogleGeocoder();

  ReactDOM.render(
    <React.StrictMode>
      {missingEnvVars.length === 0 ? <App /> : <MissingEnvVar vars={missingEnvVars} />}
    </React.StrictMode>,
    document.getElementById("root")
  );
};

runApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
