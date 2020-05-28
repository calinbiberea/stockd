import React from "react";
import envVars from "../../envVars";
import Map from "./Map";
import type MapProps from "./MapProps";

const MapScreen: React.FC<MapProps> = (props) => (
  <Map
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${envVars.googleMapsKey.value}`}
    loadingElement={<div style={{ height: "100%" }} />}
    containerElement={<div style={{ height: "100vh" }} />}
    mapElement={<div style={{ height: "100%" }} />}
    {...props}
  />
);

export default MapScreen;
