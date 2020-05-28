import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import React from "react";
import type MapProps from "./MapProps";
import mapStyles from "./MapStyles";

const Map = withScriptjs(
  withGoogleMap(({ onPlaceClick }: MapProps) => (
    <GoogleMap
      defaultCenter={{ lat: 51.49788, lng: -0.183699 }}
      defaultZoom={17}
      options={{ disableDefaultUI: true, styles: mapStyles }}
      onClick={(e: google.maps.IconMouseEvent) => {
        if (e.placeId) {
          onPlaceClick(e.placeId);
          e.stop();
        }
      }}
    />
  ))
);

export default Map;
