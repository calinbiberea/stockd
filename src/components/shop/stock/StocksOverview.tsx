import React from "react";
import { Grid, makeStyles, createStyles } from "@material-ui/core";
import { ProductId, products } from "../../../util/productsAndSafetyFeatures";
import { StocksOverviewProps } from "../ShopTypes";
import StockItem from "./StockItem";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      overflow: "auto",
      height: "100%",
    },
  })
);

const StocksOverview: React.FC<StocksOverviewProps> = ({ stocks }: StocksOverviewProps) => {
  const classes = useStyles();

  const stockItems = Object.keys(products).map((productId) => {
    const value = stocks[productId as ProductId];
    return (
      <Grid item xs={12} md={6} xl={4} key={productId}>
        <StockItem productId={productId} value={value} />
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
