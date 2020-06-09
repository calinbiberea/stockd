import React, { useEffect, useState } from "react";
import { CircularProgress, Fade, Slide, Modal, createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import type { OverlayProps } from "./OverlayTypes";
import type { LocationData } from "../../util/googleMaps";
import { getLocationDataByPlaceId } from "../../util/googleMaps";
import { ShopSelectedScreen } from "../shop/ShopTypes";
import Shop from "../shop/Shop";

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      outline: 0,
    },
    circularProgressContainer: {
      position: "absolute",
      left: "50vw",
      top: "50vh",
      transform: "translate(-50%, -50%)",
    },
    circularProgress: {
      color: "#FFF",
    },
  })
);

const Overlay: React.FC<OverlayProps> = ({
  placeId,
  closeOverlay,
  queryMap,
  defaultToStock,
  locationData = null,
}: OverlayProps) => {
  const [localLocationData, setLocalLocationData] = useState<LocationData | null>(null);
  const [selectedScreen, setSelectedScreen] = useState<ShopSelectedScreen>(
    defaultToStock ? "stock" : "overview"
  );

  const isOpen = placeId !== "";
  const isLoaded = localLocationData?.id === placeId;

  const classes = useStyles();

  useEffect(() => {
    setLocalLocationData(locationData);
  }, [locationData]);

  useEffect(() => {
    if (queryMap && isOpen && !isLoaded) {
      getLocationDataByPlaceId(placeId).then((data) => setLocalLocationData(data));
    }
  }, [placeId, isLoaded, isOpen, queryMap]);

  return (
    <Modal open={isOpen} onClose={closeOverlay} className={classes.modal}>
      <div className={classes.modalContainer}>
        <Fade in={!isLoaded}>
          <div className={classes.circularProgressContainer}>
            <CircularProgress className={classes.circularProgress} />
          </div>
        </Fade>

        <Slide direction="up" in={isLoaded}>
          <div>
            {localLocationData !== null ? (
              <Shop
                locationData={localLocationData}
                selectedScreen={selectedScreen}
                setSelectedScreen={setSelectedScreen}
              />
            ) : null}
          </div>
        </Slide>
      </div>
    </Modal>
  );
};

export default Overlay;
