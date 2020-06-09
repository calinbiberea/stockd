import React from "react";
import { Card, Typography, makeStyles, createStyles } from "@material-ui/core";
import { StockItemProps } from "./ShopTypes";
import unknown from "../../res/stock/unknown.png";
import few from "../../res/stock/few.png";
import some from "../../res/stock/some.png";
import full from "../../res/stock/full.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up("sm")]: {
        height: "64px",
      },
      [theme.breakpoints.down("xs")]: {
        height: "48px",
      },
      padding: "8px",
      margin: "8px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
    },
    icon: {
      maxHeight: "100%",
    },
  })
);

const getIconByNumber = (stock: number): string => {
  if (stock === -1) {
    return unknown;
  } else if (stock === 0) {
    return few;
  } else if (stock === 50) {
    return some;
  } else return full;
};

const StockItem: React.FC<StockItemProps> = ({ icon, name, stock }: StockItemProps) => {
  const classes = useStyles();

  const stockValueIcon = getIconByNumber(stock);

  return (
    <Card className={classes.container}>
      <img src={icon} alt="Stock Item" className={classes.icon} />

      <Typography variant="h5">{name}</Typography>

      <img src={stockValueIcon} alt="Stock Item value" className={classes.icon} />
    </Card>
  );
};

export default StockItem;
