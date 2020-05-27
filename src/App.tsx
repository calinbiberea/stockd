import React from "react";
import "./App.css";
import MapScreen from "./map/MapScreen";

const App = () => <MapScreen onPlaceClick={(placeId) => console.log("Clicked on " + placeId)} />;

export default App;
