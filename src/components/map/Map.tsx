import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import type MapProps from "./MapTypes";
import mapStyles from "./MapStyles";
import { setupGooglePlacesService } from "../../util/googleMaps";

const mapContainerStyle = {
  height: "100vh",
};

const Map: React.FC<MapProps> = ({ onPlaceClick, currentCenter }: MapProps) => (
  <GoogleMap
    center={currentCenter}
    zoom={17}
    mapContainerStyle={mapContainerStyle}
    options={{ disableDefaultUI: true, styles: mapStyles }}
    onLoad={setupGooglePlacesService}
    onClick={(e_: google.maps.MouseEvent) => {
      const e = e_ as google.maps.IconMouseEvent;

      if (e.placeId) {
        onPlaceClick(e.placeId);
        e.stop();
      }
    }}
  />
);

export default Map;
