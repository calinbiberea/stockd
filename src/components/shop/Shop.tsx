import React, { useState } from "react";
import { ShopProps } from "./ShopTypes";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopStock from "./ShopStock";
import type { ShopSelectedScreen } from "./ShopTypes";

const shopStyle = {
  width: "60vw",
  height: "45vh",
  minWidth: "500px",
  display: "flex",
  flexDirection: "column" as const,
};

const Shop: React.FC<ShopProps> = ({ shopData }: ShopProps) => {
  const [selectedScreen, setSelectedScreen] = useState("default" as ShopSelectedScreen);

  let shopScreen;
  if (selectedScreen === "default") {
    shopScreen = (
      <ShopOverview
        onUpdateClicked={() => {
          setSelectedScreen("stock");
        }}
      />
    );
  } else if (selectedScreen === "stock") {
    shopScreen = <ShopStock shopId={shopData.id} />;
  }

  const onBackClick = () => {
    if (selectedScreen === "default") {
      setSelectedScreen("stock");
    } else if (selectedScreen === "stock") {
      setSelectedScreen("default");
    }
  };

  return (
    <div style={shopStyle}>
      <ShopHeader shopData={shopData} onBackClick={onBackClick} />

      {shopScreen}
    </div>
  );
};

export default Shop;
