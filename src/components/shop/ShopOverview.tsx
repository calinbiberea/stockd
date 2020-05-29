import React from "react";
import StockItem from "./StockItem";
import breadIcon from "../../res/icons/bread.svg";
import eggsIcon from "../../res/icons/eggs.svg";
import milkIcon from "../../res/icons/milk.svg";
import pastaIcon from "../../res/icons/pasta.svg";
import { FloatingActionButton } from "./floatingActionButton/FloatingActionButton";

const containerStyle = {
  flex: 4,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-around",
  alignItems: "center",
};

const stockOverviewStyle = {
  display: "flex",
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  justifyContent: "space-around",
  alignItems: "center",
};

const ShopOverview: React.FC = () => (
  <div style={containerStyle}>
    <div style={stockOverviewStyle}>
      <StockItem icon={breadIcon} name="Bread" stock={2} />
      <StockItem icon={eggsIcon} name="Eggs" stock={2} />
      <StockItem icon={milkIcon} name="Milk" stock={2} />
      <StockItem icon={pastaIcon} name="Pasta" stock={2} />
    </div>

    <FloatingActionButton />
  </div>
);

export default ShopOverview;
