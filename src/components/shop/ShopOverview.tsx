import React, { useState } from "react";
import { Button, makeStyles, createStyles, Slide } from "@material-ui/core";
import TabBar from "../tabBar/TabBar";
import StocksOverview from "./stock/StocksOverview";
import SafetyOverview from "./safety/SafetyOverview";
import { ShopOverviewProps } from "./ShopTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    slideContainer: {
      width: "100%",
      height: "100%",
      overflowX: "hidden",
      overflowY: "hidden",
    },
    slidePanel: {
      position: "relative",
      width: "100%",
      height: "100%",
    },
    slidePanelInner: {
      transform: "translate(0, -100%)",
      width: "100%",
      height: "100%",
    },
  })
);

const tabNames = ["Stocks", "Safety"];

const ShopOverview: React.FC<ShopOverviewProps> = ({
  locationData,
  stocks,
  safetyScore,
  usedSafetyFeatures,
}: ShopOverviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const classes = useStyles();

  const onButtonClick = () => {
    const getMapsUrl = (placeName: string, placeId: string) => {
      const encodedName = encodeURI(placeName);

      return `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${placeId}`;
    };

    window.open(getMapsUrl(locationData.name, locationData.id));
  };

  return (
    <div className={classes.container}>
      <TabBar tabNames={tabNames} index={currentIndex} setIndex={setCurrentIndex} />

      <div className={classes.slideContainer}>
        <Slide in={currentIndex === 0} direction="right">
          <div className={classes.slidePanel}>
            <StocksOverview stocks={stocks} />
          </div>
        </Slide>
        <Slide in={currentIndex === 1} direction="left">
          <div className={classes.slidePanel}>
            <div className={classes.slidePanelInner}>
              <SafetyOverview safetyScore={safetyScore} usedSafetyFeatures={usedSafetyFeatures} />
            </div>
          </div>
        </Slide>
      </div>

      <Button variant="contained" color="primary" onClick={onButtonClick}>
        Take me there!
      </Button>
    </div>
  );
};

export default ShopOverview;
