import React from "react";
import StockItem from "./StockItem";
import breadIcon from "../../res/icons/bread.svg";
import eggsIcon from "../../res/icons/eggs.svg";
import milkIcon from "../../res/icons/milk.svg";
import pastaIcon from "../../res/icons/pasta.svg";
import { FloatingActionButton } from "./floatingActionButton/FloatingActionButton";

const containerStyle = {
  width: "100%",
  height: "80%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
};

const ShopOverview: React.FC = () => (
  <div style={containerStyle}>
    <StockItem icon={breadIcon} name="Bread" stock={2} />
    <StockItem icon={eggsIcon} name="Eggs" stock={2} />
    <StockItem icon={milkIcon} name="Milk" stock={2} />
    <StockItem icon={pastaIcon} name="Pasta" stock={2} />
    <FloatingActionButton />
  </div>
);

export default ShopOverview;
