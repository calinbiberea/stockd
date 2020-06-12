import React from "react";
import { Grid, makeStyles, createStyles } from "@material-ui/core";
import StockItem from "./StockItem";
import { StocksOverviewProps } from "../ShopTypes";
import { getProduct } from "../../../util/productsAndSafetyFeatures";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      overflow: "auto",
    },
  })
);

const StocksOverview: React.FC<StocksOverviewProps> = ({ stocks }: StocksOverviewProps) => {
  const classes = useStyles();

  const stockItems = Object.entries(stocks).map(([productId, value]) => {
    const { name, icon } = getProduct(productId);
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
