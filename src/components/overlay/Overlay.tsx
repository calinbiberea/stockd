import React from "react";
import { Backdrop } from "@material-ui/core";
import PlacesLoader from "./PlacesLoader";
import { OverlayProps } from "./OverlayTypes";

const Overlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  const isOpen = props.placeId !== "";

  return (
    <div style={{ position: "absolute", zIndex: 2000 }}>
      <PlacesLoader {...props} />
      <Backdrop open={isOpen} onClick={props.closeOverlay}>
        &nbsp;
      </Backdrop>
    </div>
  );
};

export default Overlay;
