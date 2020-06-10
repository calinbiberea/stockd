import React, { useState, useEffect } from "react";
import { Card, makeStyles, createStyles } from "@material-ui/core";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopStock from "./ShopStock";
import { Stocks, ShopProps } from "./ShopTypes";
import { db } from "../../firebase/firebaseApp";
import { getProduct } from "../../util/productsAndSafetyFeatures";
import breadIcon from "../../res/icons/bread.svg";
import eggsIcon from "../../res/icons/eggs.svg";
import milkIcon from "../../res/icons/milk.svg";
import pastaIcon from "../../res/icons/pasta.svg";
import medicineIcon from "../../res/icons/medicine.svg";
import toiletPaperIcon from "../../res/icons/toiletPaper.svg";

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

const defaultStocks: Stocks = {
  Bread: {
    icon: breadIcon,
    stock: -1,
  },
  Eggs: {
    icon: eggsIcon,
    stock: -1,
  },
  Milk: {
    icon: milkIcon,
    stock: -1,
  },
  Pasta: {
    icon: pastaIcon,
    stock: -1,
  },
  Medicine: {
    icon: medicineIcon,
    stock: -1,
  },
  "Toilet Paper": {
    icon: toiletPaperIcon,
    stock: -1,
  },
};

const Shop: React.FC<ShopProps> = ({ locationData, selectedScreen }: ShopProps) => {
  const [stocks, setStocks] = useState(defaultStocks);

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

          if (data?.displayed) {
            const newStocks: Stocks = Object.entries(data.displayed.stocks).reduce(
              (acc: Stocks, [key, value]) => {
                const { name, icon } = getProduct(key);

                acc[name] = {
                  icon,
                  stock: value as number,
                };

                return acc;
              },
              {}
            );

            setStocks((prevState) => ({ ...prevState, ...newStocks }));
          }
        },
        (err) => console.error(`Encountered error: ${err}`)
      );
  }, [locationData.id]);

  let shopScreen: React.ReactNode;
  if (selectedScreen === "overview") {
    shopScreen = <ShopOverview stocks={stocks} locationData={locationData} />;
  } else if (selectedScreen === "stock") {
    shopScreen = <ShopStock stocks={stocks} locationData={locationData} />;
  }

  return (
    <Card className={classes.container}>
      <div className={classes.headerContainer}>
        <ShopHeader locationData={locationData} />
      </div>

      <div className={classes.screenContainer}>{shopScreen}</div>
    </Card>
  );
};

export default Shop;
