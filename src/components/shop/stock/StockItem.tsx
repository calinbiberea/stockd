import React from "react";
import { Card, Typography, makeStyles, createStyles } from "@material-ui/core";
import { StockItemProps } from "../ShopTypes";
import { getIconByStockValue } from "../../../util/productsAndSafetyFeatures";

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

const StockItem: React.FC<StockItemProps> = ({ icon, name, value }: StockItemProps) => {
  const classes = useStyles();

  const stockValueIcon = getIconByStockValue(value);

  return (
    <Card className={classes.container}>
      <img src={icon} alt="Stock Item" className={classes.icon} />

      <Typography variant="h5">{name}</Typography>

      <img src={stockValueIcon} alt="Stock Item value" className={classes.icon} />
    </Card>
  );
};

export default StockItem;
