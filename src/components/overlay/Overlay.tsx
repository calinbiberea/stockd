import React, { useEffect, useState } from "react";
import { Card, CircularProgress, Fade, Slide, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import type { OverlayProps } from "./OverlayTypes";
import type { LocationData } from "../../util/googleMaps";
import { getLocationDataByPlaceId } from "../../util/googleMaps";
import { ShopSelectedScreen } from "../shop/ShopTypes";
import Shop from "../shop/Shop";

const useStyles = makeStyles({
  centered: {
    position: "absolute",
    left: "50vw",
    top: "50vh",
    transform: "translate(-50%, -50%)",
  },
});

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalChildStyle = {
  outline: 0,
};

const circularProgressStyle = {
  color: "#FFF",
};

const Overlay: React.FC<OverlayProps> = ({
  placeId,
  closeOverlay,
  queryMap,
  defaultToStock,
  locationData = null,
}: OverlayProps) => {
  const classes = useStyles();
  const [localLocationData, setLocalLocationData] = useState<LocationData | null>(null);
  const [selectedScreen, setSelectedScreen] = useState<ShopSelectedScreen>(
    defaultToStock ? "stock" : "default"
  );
  const isOpen = placeId !== "";
  const isLoaded = localLocationData?.id === placeId;

  useEffect(() => {
    setLocalLocationData(locationData);
  }, [locationData]);

  useEffect(() => {
    if (queryMap && isOpen && !isLoaded) {
      getLocationDataByPlaceId(placeId).then((data) => setLocalLocationData(data));
    }
  }, [placeId, isLoaded, isOpen, queryMap]);

  return (
    <Modal open={isOpen} style={modalStyle} onClose={closeOverlay}>
      <div style={modalChildStyle}>
        <Fade in={!isLoaded}>
          <div className={classes.centered}>
            <CircularProgress style={circularProgressStyle} />
          </div>
        </Fade>

        <Slide direction="up" in={isLoaded}>
          <Card>
            {localLocationData !== null ? (
              <Shop
                locationData={localLocationData}
                selectedScreen={selectedScreen}
                setSelectedScreen={setSelectedScreen}
              />
            ) : null}
          </Card>
        </Slide>
      </div>
    </Modal>
  );
};

export default Overlay;
