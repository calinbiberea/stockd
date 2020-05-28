import React from "react";
import Map from "./Map";
import { apiKey } from "./APIKey";
import type MapProps from "./MapProps";

const MapScreen: React.FC<MapProps> = (props) => (
  <Map
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${apiKey}`}
    loadingElement={<div style={{ height: "100%" }} />}
    containerElement={<div style={{ height: "100vh" }} />}
    mapElement={<div style={{ height: "100%" }} />}
    {...props}
  />
);

export default MapScreen;
