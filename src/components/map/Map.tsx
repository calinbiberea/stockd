/* eslint-disable no-undef */
import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import type MapProps from "./MapProps";
import mapStyles from "./MapStyles";
import { setupGooglePlacesService } from "../../util/googleMaps";

const Map: React.FC<MapProps> = ({ onPlaceClick }: MapProps) => (
  <GoogleMap
    center={{ lat: 51.49788, lng: -0.183699 }}
    zoom={17}
    mapContainerStyle={{ height: "100vh" }}
    options={{ disableDefaultUI: true, styles: mapStyles }}
    onClick={(e_: google.maps.MouseEvent) => {
      const e = e_ as google.maps.IconMouseEvent;
      if (e.placeId) {
        onPlaceClick(e.placeId);
        e.stop();
      }
    }}
    onLoad={setupGooglePlacesService}
  />
);

export default Map;
