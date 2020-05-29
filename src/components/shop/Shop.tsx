import React, { useState } from "react";
import { ShopProps } from "./ShopTypes";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopStock from "./ShopStock";
import type { ShopSelectedScreen } from "./ShopTypes";

const shopStyle = {
  width: "40vw",
  height: "45vh",
};

const Shop: React.FC<ShopProps> = ({ shopData }: ShopProps) => {
  const [selectedScreen, setSelectedScreen] = useState("default" as ShopSelectedScreen);

  let shopScreen;
  if (selectedScreen === "default") {
    shopScreen = <ShopOverview />;
  } else if (selectedScreen === "stock") {
    shopScreen = <ShopStock />;
  }

  return (
    <div style={shopStyle}>
      <ShopHeader name={shopData.name} id={shopData.id} selectedScreen={selectedScreen} />

      {shopScreen}
    </div>
  );
};

export default Shop;
