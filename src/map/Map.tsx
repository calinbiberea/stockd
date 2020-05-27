import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import React from "react";
import MapProps from "./MapProps";
import mapStyles from "./MapStyles";

const Map = withScriptjs(
  withGoogleMap(({ onPlaceClick }: MapProps) => (
    <GoogleMap
      defaultCenter={{ lat: 51.49788, lng: -0.183699 }}
      defaultZoom={17}
      options={{ disableDefaultUI: true, gestureHandling: "none", styles: mapStyles }}
      onClick={(e: google.maps.IconMouseEvent) => {
        if (e.placeId) {
          onPlaceClick(e.placeId);
          e.stop();
        }
      }}
    >
      {/*<Marker position={{ lat: 51.49781, lng: -0.18375 }} />*/}
      {/*<Marker position={{ lat: 51.499, lng: -0.18369 }} />*/}
    </GoogleMap>
  ))
);

export default Map;
