import React from "react";
import "./App.css";
import MapScreen from "./map/MapScreen";

const App: React.FC = () => (
  // eslint-disable-next-line no-console
  <MapScreen onPlaceClick={(placeId) => console.log("Clicked on " + placeId)} />
);

export default App;
