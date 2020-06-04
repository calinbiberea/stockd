import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { StockItemProps } from "./ShopTypes";
import few from "../../res/stock/few.png";
import some from "../../res/stock/some.png";
import full from "../../res/stock/full.png";
import unknown from "../../res/stock/unknown.png";

const itemContainerStyle = {
  height: "64px",
  padding: "8px",
  margin: "8px",
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  justifyContent: "space-between",
};

const iconStyle = {
  height: "100%",
};

const getIconByNumber = (stock: number): string => {
  if (stock === -1) {
    return unknown;
  } else if (stock === 0) {
    return few;
  } else if (stock === 50) {
    return some;
  }
  return full;
};

const StockItem: React.FC<StockItemProps> = ({ icon, name, stock }: StockItemProps) => {
  const style = { ...itemContainerStyle };

  const stockIcon = getIconByNumber(stock);

  return (
    <Card style={style}>
      <img src={icon} alt="Stock Item icon" style={iconStyle} />

      <Typography variant="h5">{name}</Typography>

      <img src={stockIcon} alt="Stock Item value" style={iconStyle} />
    </Card>
  );
};

export default StockItem;
