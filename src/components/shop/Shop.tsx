import React, { useState, useEffect } from "react";
import { ShopProps } from "./ShopTypes";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopStock from "./ShopStock";
import { db } from "../../firebase/firebaseApp";
import { Stocks } from "./ShopTypes";
import breadIcon from "../../res/icons/bread.svg";
import eggsIcon from "../../res/icons/eggs.svg";
import milkIcon from "../../res/icons/milk.svg";
import pastaIcon from "../../res/icons/pasta.svg";

const shopStyle = {
  width: "60vw",
  height: "45vh",
  minWidth: "500px",
  display: "flex",
  flexDirection: "column" as const,
};

/* TODO: ugly, please fix */
const getIconByName = (name: string): string => {
  if (name === "Bread") {
    return breadIcon;
  } else if (name === "Eggs") {
    return eggsIcon;
  } else if (name === "Milk") {
    return milkIcon;
  } else if (name === "Pasta") {
    return pastaIcon;
  } else {
    return breadIcon;
  }
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
};

const Shop: React.FC<ShopProps> = ({
  shopData,
  selectedScreen,
  setSelectedScreen,
  onBackClick,
}: ShopProps) => {
  const [stocks, setStocks] = useState(defaultStocks);

  useEffect(() => {
    setStocks(defaultStocks);
  }, [shopData.id]);

  useEffect(() => {
    return db
      .collection("shops")
      .doc(shopData.id)
      .onSnapshot(
        (snapshot) => {
          const data = snapshot.data();

          if (data) {
            const newData: Stocks = Object.entries(data)
              .filter(([key, value]) => {
                return !key.includes("Stock") && typeof value === "number";
              })
              .reduce((acc: Stocks, [name, value]) => {
                const icon = getIconByName(name);

                acc[name] = {
                  icon,
                  stock: value,
                };

                return acc;
              }, {});

            setStocks((prevState) => ({ ...prevState, ...newData }));
          }
        },
        (err) => console.error(`Encountered error: ${err}`)
      );
  }, [shopData.id]);

  let shopScreen = null;
  if (selectedScreen === "default") {
    shopScreen = (
      <ShopOverview stocks={stocks} onUpdateClicked={() => setSelectedScreen("stock")} />
    );
  } else if (selectedScreen === "stock") {
    shopScreen = <ShopStock stocks={stocks} shopId={shopData.id} />;
  }

  return (
    <div style={shopStyle}>
      <ShopHeader shopData={shopData} onBackClick={onBackClick} />

      {shopScreen}
    </div>
  );
};

export default Shop;
