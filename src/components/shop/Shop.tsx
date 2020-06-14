import React, { useState, useEffect } from "react";
import { Card, makeStyles, createStyles } from "@material-ui/core";
import { db } from "../../firebase/firebaseApp";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopEdit from "./ShopEdit";
import { Stocks, ShopProps, SafetyFeatures } from "./ShopTypes";

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

const Shop: React.FC<ShopProps> = ({ locationData, edit, onBackClick }: ShopProps) => {
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

          if (data?.displayed?.safetyRating) {
            setSafetyScore(data.displayed.safetyRating);
          }

          if (data?.displayed?.safety) {
            setSafetyFeatures(data.displayed.safety);
          }
        },
        (err) => console.error(`Encountered error: ${err}`)
      );
  }, [locationData.id]);

  let shopScreen: React.ReactNode;
  if (edit) {
    shopScreen = <ShopEdit {...{ locationData, stocks, safetyScore, usedSafetyFeatures }} />;
  } else {
    shopScreen = <ShopOverview {...{ locationData, stocks, safetyScore, usedSafetyFeatures }} />;
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
