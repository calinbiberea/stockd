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

const Overlay: React.FC<OverlayProps> = ({ placeId, closeOverlay }: OverlayProps) => {
  const classes = useStyles();
  const [locationData, setLocationData] = useState(null as LocationData | null);
  const [selectedScreen, setSelectedScreen] = useState("default" as ShopSelectedScreen);
  const isOpen = placeId !== "";
  const isLoaded = locationData?.id === placeId;

  useEffect(() => {
    if (isOpen && !isLoaded) {
      getLocationDataByPlaceId(placeId).then((data) => setLocationData(data));
    }
  }, [placeId, isLoaded, isOpen]);

  const onBackClick = () => {
    if (selectedScreen === "default") {
      closeOverlay();
    } else {
      setSelectedScreen("default");
    }
  };

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
            {locationData !== null ? (
              <Shop
                locationData={locationData}
                selectedScreen={selectedScreen}
                setSelectedScreen={setSelectedScreen}
                onBackClick={onBackClick}
              />
            ) : null}
          </Card>
        </Slide>
      </div>
    </Modal>
  );
};

export default Overlay;
