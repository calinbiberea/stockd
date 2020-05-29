import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { StockItemProps } from "./ShopTypes";
import colors from "../../res/colors";

const itemContainerStyle = {
  width: "40%",
  height: "64px",
  padding: "8px",
  margin: "8px",
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "center",
  justifyContent: "space-between",
};

const clickableStyle = {
  backgroundColor: colors.blue3,
  cursor: "pointer",
};

const iconStyle = {
  height: "100%",
};

const StockItem: React.FC<StockItemProps> = ({
  icon,
  name,
  stock,
  canUpdate,
  onUpdateClick,
}: StockItemProps) => {
  const style = { ...(canUpdate ? clickableStyle : {}), ...itemContainerStyle };
  const onClick = () => {
    if (canUpdate) {
      onUpdateClick();
    }
  };

  return (
    <Card style={style} onClick={onClick}>
      <img src={icon} alt="Stock Item icon" style={iconStyle} />
      <Typography variant="h5">{name}</Typography>
      <Typography variant="h5">Stock {stock}</Typography>
    </Card>
  );
};

export default StockItem;
