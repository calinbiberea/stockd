import React from "react";
import { Grid, makeStyles, createStyles } from "@material-ui/core";
import { getProduct, ProductId, products } from "../../../util/productsAndSafetyFeatures";
import { StocksOverviewProps } from "../ShopTypes";
import StockItem from "./StockItem";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      overflow: "auto",
    },
  })
);

const StocksOverview: React.FC<StocksOverviewProps> = ({ stocks }: StocksOverviewProps) => {
  const classes = useStyles();

  const stockItems = Object.entries(products).map(([productId, { icon, name }]) => {
    const value = stocks[productId as ProductId];
    return (
      <Grid item xs={12} md={6} xl={4} key={productId}>
        <StockItem icon={icon} name={name} value={value} />
      </Grid>
    );
  });

  return (
    <Grid container className={classes.container}>
      {stockItems}
    </Grid>
  );
};

export default StocksOverview;
