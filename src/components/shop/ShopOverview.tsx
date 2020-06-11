import React, { useState } from "react";
import { Button, makeStyles, createStyles } from "@material-ui/core";
import StocksOverview from "./StocksOverview";
import { ShopOverviewProps } from "./ShopTypes";
import SafetyOverview from "./SafetyOverview";
import TabBar from "../tabBar/TabBar";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

const tabNames = ["Stocks", "Safety"];

const ShopOverview: React.FC<ShopOverviewProps> = ({
  stocks,
  locationData,
  safety,
}: ShopOverviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const classes = useStyles();

  const indexToScreen = (index: number): React.ReactNode => {
    switch (index) {
      case 0:
        return <StocksOverview stocks={stocks} />;
      case 1:
        return <SafetyOverview safety={safety} />;
      default:
        console.error("Invalid index in ShopOverview");
        return <StocksOverview stocks={stocks} />;
    }
  };

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

      {indexToScreen(currentIndex)}

      <Button variant="contained" color="primary" onClick={onButtonClick}>
        Take me there!
      </Button>
    </div>
  );
};

export default ShopOverview;
