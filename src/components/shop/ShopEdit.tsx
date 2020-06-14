import React, { useState } from "react";
import { makeStyles, createStyles, Slide } from "@material-ui/core";
import TabBar from "../tabBar/TabBar";
import StocksEdit from "./stock/StocksEdit";
import SafetyEdit from "./safety/SafetyEdit";
import { ShopEditProps } from "./ShopTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
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

const ShopEdit: React.FC<ShopEditProps> = ({
  locationData,
  stocks,
  safetyScore,
  usedSafetyFeatures,
}: ShopEditProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TabBar tabNames={tabNames} index={currentIndex} setIndex={setCurrentIndex} />

      <div className={classes.slideContainer}>
        <Slide in={currentIndex === 0} direction="right">
          <div className={classes.slidePanel}>
            <StocksEdit {...{ locationData, stocks }} />
          </div>
        </Slide>
        <Slide in={currentIndex === 1} direction="left">
          <div className={classes.slidePanel}>
            <div className={classes.slidePanelInner}>
              <SafetyEdit {...{ locationData, safetyScore, usedSafetyFeatures }} />
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default ShopEdit;
