import React, { useState, useEffect } from "react";
import { ShopProps } from "./ShopTypes";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopStock from "./ShopStock";
import { db } from "../../firebase/firebaseApp";
import { Stocks } from "./ShopTypes";
import { getProduct } from "../../util/products";
import breadIcon from "../../res/icons/bread.svg";
import eggsIcon from "../../res/icons/eggs.svg";
import milkIcon from "../../res/icons/milk.svg";
import pastaIcon from "../../res/icons/pasta.svg";
import medicineIcon from "../../res/icons/medicineIcon.svg";
import toiletPaperIcon from "../../res/icons/toiletPaperIcon.svg";

const shopStyle = {
  width: "60vw",
  height: "45vh",
  minWidth: "500px",
  display: "flex",
  flexDirection: "column" as const,
};

const defaultStocks: Stocks = {
  Bread: {
    icon: breadIcon,
    stock: 0,
  },
  Eggs: {
    icon: eggsIcon,
    stock: 0,
  },
  Milk: {
    icon: milkIcon,
    stock: 0,
  },
  Pasta: {
    icon: pastaIcon,
    stock: 0,
  },
  Medicine: {
    icon: medicineIcon,
    stock: 0,
  },
  ToiletPaper: {
    icon: toiletPaperIcon,
    stock: 0,
  },
};

const Shop: React.FC<ShopProps> = ({
  locationData,
  selectedScreen,
  setSelectedScreen,
  onBackClick,
}: ShopProps) => {
  const [stocks, setStocks] = useState(defaultStocks);

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

          if (data) {
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
  if (selectedScreen === "default") {
    shopScreen = (
      <ShopOverview stocks={stocks} onUpdateClicked={() => setSelectedScreen("stock")} />
    );
  } else if (selectedScreen === "stock") {
    shopScreen = <ShopStock stocks={stocks} locationData={locationData} />;
  }

  return (
    <div style={shopStyle}>
      <ShopHeader locationData={locationData} onBackClick={onBackClick} />

      {shopScreen}
    </div>
  );
};

export default Shop;
