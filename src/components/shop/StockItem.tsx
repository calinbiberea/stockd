import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { StockItemProps } from "./ShopTypes";

const itemContainerStyle = {
  width: "40%",
  height: "20%",
  padding: "8px",
  margin: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const iconStyle = {
  height: "100%",
};

const StockItem: React.FC<StockItemProps> = ({ icon, name, stock }: StockItemProps) => (
  <Card style={itemContainerStyle}>
    <img src={icon} alt="Stock Item icon" style={iconStyle} />

    <Typography variant="h5">{name}</Typography>

    <Typography variant="h5">Stock {stock}</Typography>
  </Card>
);

export default StockItem;
