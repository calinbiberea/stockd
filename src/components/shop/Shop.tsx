import React, { useState, useEffect } from "react";
import { Card, makeStyles, createStyles } from "@material-ui/core";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopStock from "./ShopStock";
import { Stocks, ShopProps, SafetyFeatures } from "./ShopTypes";
import { db } from "../../firebase/firebaseApp";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "60vw",
        height: "45vh",
      },
      [theme.breakpoints.down("xs")]: {
        width: "80vw",
        height: "50vh",
      },
    },
    headerContainer: {
      flex: 1,
    },
    screenContainer: {
      flex: 4,
      marginBottom: "8px",
      overflow: "auto",
    },
  })
);

const Shop: React.FC<ShopProps> = ({ locationData, selectedScreen, onBackClick }: ShopProps) => {
  const [stocks, setStocks] = useState<Stocks>({});
  const [safetyScore, setSafetyScore] = useState(0);
  const [usedSafetyFeatures, setSafetyFeatures] = useState<SafetyFeatures>({});

  const classes = useStyles();

  // Reset stocks on location ID change
  useEffect(() => {
    setStocks({});
  }, [locationData.id]);

  useEffect(() => {
    return db
      .collection("shops")
      .doc(locationData.id)
      .onSnapshot(
        (snapshot) => {
          const data = snapshot.data();

          if (data?.displayed?.stocks) {
            setStocks(data.displayed.stocks as Stocks);
          }

          if (data?.displayed?.safetyScore) {
            setSafetyScore(data.displayed.safetyScore);
          }

          if (data?.displayed?.safetyFeatures) {
            setSafetyFeatures(data.displayed.safetyFeatures);
          }
        },
        (err) => console.error(`Encountered error: ${err}`)
      );
  }, [locationData.id]);

  let shopScreen: React.ReactNode;
  if (selectedScreen === "overview") {
    shopScreen = (
      <ShopOverview
        locationData={locationData}
        stocks={stocks}
        safetyScore={safetyScore}
        usedSafetyFeatures={usedSafetyFeatures}
      />
    );
  } else if (selectedScreen === "stock") {
    shopScreen = <ShopStock locationData={locationData} stocks={stocks} />;
  }

  return (
    <Card className={classes.container}>
      <div className={classes.headerContainer}>
        <ShopHeader locationData={locationData} noBackButton={false} onBackClick={onBackClick} />
      </div>

      <div className={classes.screenContainer}>{shopScreen}</div>
    </Card>
  );
};

export default Shop;
