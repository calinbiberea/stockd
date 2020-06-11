import React, { useState, useEffect } from "react";
import { Card, makeStyles, createStyles } from "@material-ui/core";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopStock from "./ShopStock";
import { Stocks, ShopProps, SafetyFeatures } from "./ShopTypes";
import { db } from "../../firebase/firebaseApp";
import {
  getProduct,
  getSafetyFeature,
  products,
  safetyFeatures,
} from "../../util/productsAndSafetyFeatures";

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

const defaultStocks: Stocks = Object.fromEntries(
  Object.values(products).map(({ icon, name }) => [name, { icon, value: undefined }])
);

const defaultSafetyFeatures: SafetyFeatures = Object.fromEntries(
  Object.values(safetyFeatures).map((name) => [name, undefined])
);

const Shop: React.FC<ShopProps> = ({ locationData, selectedScreen, setSelectedScreen, onBackClick }: ShopProps) => {
  const [stocks, setStocks] = useState(defaultStocks);
  const [safetyScore, setSafetyScore] = useState(0);
  const [safetyFeatures, setSafetyFeatures] = useState(defaultSafetyFeatures);

  const classes = useStyles();

  useEffect(() => {
    setStocks(defaultStocks);
  }, [locationData.id]);

  useEffect(() => {
    return db
      .collection("shops")
      .doc(locationData.id)
      .onSnapshot(
        (snapshot) => {
          const data = snapshot.data();

          if (data?.displayed?.stocks) {
            const newStocks: Stocks = Object.entries(data.displayed.stocks).reduce(
              (acc: Stocks, [key, value]) => {
                const { name, icon } = getProduct(key);

                acc[name] = {
                  icon,
                  value: value as number,
                };

                return acc;
              },
              {}
            );

            setStocks((prevState) => ({ ...prevState, ...newStocks }));
          }

          if (data?.displayed.safetyScore) {
            const newSafetyScore: number = data.displayed.safetyScore;

            setSafetyScore(newSafetyScore);
          }

          if (data?.displayed?.safetyFeatures) {
            const newSafetyFeatures: SafetyFeatures = Object.entries(
              data.displayed.safetyFeatures
            ).reduce((acc: SafetyFeatures, [key, value]) => {
              const name = getSafetyFeature(key);

              acc[name] = value as boolean | undefined;

              return acc;
            }, {});

            setSafetyFeatures((prevState) => ({ ...prevState, ...newSafetyFeatures }));
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
        safetyFeatures={safetyFeatures}
      />
    );
  } else if (selectedScreen === "stock") {
    shopScreen = <ShopStock locationData={locationData} stocks={stocks} />;
  }

  return (
    <Card className={classes.container}>
      <div className={classes.headerContainer}>
        <ShopHeader locationData={locationData}
                    noBackButton={false}
                    onBackClick={onBackClick}/>
      </div>

      <div className={classes.screenContainer}>{shopScreen}</div>
    </Card>
  );
};

export default Shop;
