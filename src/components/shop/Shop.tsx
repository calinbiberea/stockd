import React from "react";
import { ShopProps } from "./ShopTypes";
import ShopHeader from "./ShopHeader";
import ShopOverview from "./ShopOverview";
import ShopStock from "./ShopStock";

const shopStyle = {
  width: "60vw",
  height: "45vh",
  minWidth: "500px",
  display: "flex",
  flexDirection: "column" as const,
};

const Shop: React.FC<ShopProps> = ({
  shopData,
  selectedScreen,
  setSelectedScreen,
  onBackClick,
}: ShopProps) => {
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

  return (
    <div style={shopStyle}>
      <ShopHeader shopData={shopData} onBackClick={onBackClick} />
      {shopScreen}
    </div>
  );
};

export default Shop;
