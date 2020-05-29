import type { OverlayProps, ShopData } from "./OverlayTypes";
import React, { useEffect, useState } from "react";
import { Box, Card, CircularProgress, Fade, Slide } from "@material-ui/core";
import { getInfoForPlace } from "../../util/googleMaps";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  centered: {
    position: "absolute",
    left: "50vw",
    top: "50vh",
    transform: "translate(-50%, -50%)",
  },
});

const PlacesLoader: React.FC<OverlayProps> = ({ placeId, closeOverlay }: OverlayProps) => {
  const classes = useStyles();
  const [shopData, setShopData] = useState(null as ShopData | null);
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

  return (
    <div>
      <Fade in={isOpen && !isLoaded}>
        <Box className={classes.centered}>
          <CircularProgress style={{ color: "#FFF" }} />
        </Box>
      </Fade>
      <Slide direction="up" in={isOpen && isLoaded}>
        <div>
          <Card className={classes.centered}>
            {shopData !== null ? <b>{shopData.name}</b> : undefined}
          </Card>
        </div>
      </Slide>
    </div>
  );
};

export default PlacesLoader;
