import React, { PropsWithChildren } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { setupGooglePlacesService } from "../../util/googleMaps";
import type MapProps from "./MapTypes";
import mapStyles from "./MapStyles";

const mapContainerStyle = {
  height: "100vh",
};

const Map: React.FC<MapProps> = ({
  onPlaceClick = () => {
    /* do nothing */
  },
  currentCenter,
  showGoogleMarkers = false,
  children,
}: PropsWithChildren<MapProps>) => (
  <GoogleMap
    center={currentCenter}
    zoom={17}
    mapContainerStyle={mapContainerStyle}
    options={{ disableDefaultUI: true, styles: mapStyles(showGoogleMarkers) }}
    onLoad={setupGooglePlacesService}
    onClick={(e_: google.maps.MouseEvent) => {
      const e = e_ as google.maps.IconMouseEvent;

      if (e.placeId) {
        onPlaceClick(e.placeId);
        e.stop();
      }
    }}
  >
    {children}
  </GoogleMap>
);

export default Map;
