import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { StockItemProps } from "./ShopTypes";
import colors from "../../res/colors";
import few from "../../res/stock/few.png";
import some from "../../res/stock/some.png";
import full from "../../res/stock/full.png";

const itemContainerStyle = {
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

const getIconByNumber = (stock: number): string => {
  if (stock === 0) {
    return few;
  } else if (stock === 50) {
    return some;
  }
  return full;
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

  const stockIcon = getIconByNumber(stock);

  return (
    <Card style={style} onClick={onClick}>
      <img src={icon} alt="Stock Item icon" style={iconStyle} />

      <Typography variant="h5">{name}</Typography>

      <img src={stockIcon} alt="Stock Item value" style={iconStyle} />
    </Card>
  );
};

export default StockItem;
