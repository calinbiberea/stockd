import React, { useEffect, useState } from "react";
import { Backdrop, Box, Card, CircularProgress, Fade, Slide } from "@material-ui/core";
import { getInfoForPlace } from "../../util/googleMaps";
import { makeStyles } from "@material-ui/core/styles";
import type { OverlayProps } from "./OverlayTypes";
import type { ShopData } from "../../util/googleMaps";
import Shop from "../shop/Shop";
import { ShopSelectedScreen } from "../shop/ShopTypes";

const useStyles = makeStyles({
  centered: {
    position: "absolute",
    left: "50vw",
    top: "50vh",
    transform: "translate(-50%, -50%)",
  },
});

const Overlay: React.FC<OverlayProps> = ({ placeId, closeOverlay }: OverlayProps) => {
  const classes = useStyles();
  const [shopData, setShopData] = useState(null as ShopData | null);
  const [selectedScreen, setSelectedScreen] = useState("default" as ShopSelectedScreen);
  const isOpen = placeId !== "";
  const isLoaded = shopData !== null && shopData.id === placeId;

  useEffect(() => {
    if (!isOpen || isLoaded) {
      return;
    }

    getInfoForPlace(placeId).then((data) => {
      setShopData(data);
    });
  }, [placeId, isLoaded, isOpen]);

  const onBackClick = () => {
    if (selectedScreen === "default") {
      closeOverlay();
    } else {
      setSelectedScreen("default");
    }
  };

  return (
    <div style={{ position: "absolute", zIndex: 2000 }}>
      <Fade in={isOpen && !isLoaded}>
        <Box className={classes.centered}>
          <CircularProgress style={{ color: "#FFF" }} />
        </Box>
      </Fade>

      <Slide direction="up" in={isOpen && isLoaded}>
        <div>
          <Card className={classes.centered}>
            {shopData !== null ? (
              <Shop
                shopData={shopData}
                selectedScreen={selectedScreen}
                setSelectedScreen={setSelectedScreen}
                onBackClick={onBackClick}
              />
            ) : undefined}
          </Card>
        </div>
      </Slide>

      <Backdrop open={isOpen} onClick={onBackClick}>
        &nbsp;
      </Backdrop>
    </div>
  );
};

export default Overlay;
