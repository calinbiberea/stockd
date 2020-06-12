import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { ShopEditProps } from "./ShopTypes";
import TabBar from "../tabBar/TabBar";
import StocksEdit from "./StocksEdit";
import SafetyEdit from "./SafetyEdit";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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

  const indexToScreen = (index: number): React.ReactNode => {
    switch (index) {
      case 0:
        return <StocksEdit locationData={locationData} stocks={stocks} />;
      case 1:
        return <SafetyEdit safetyScore={safetyScore} usedSafetyFeatures={usedSafetyFeatures} />;
      default:
        console.error("Invalid index in ShopEdit");
        return <StocksEdit locationData={locationData} stocks={stocks} />;
    }
  };

  return (
    <div className={classes.container}>
      <TabBar tabNames={tabNames} index={currentIndex} setIndex={setCurrentIndex} />

      {indexToScreen(currentIndex)}
    </div>
  );
};

export default ShopEdit;
