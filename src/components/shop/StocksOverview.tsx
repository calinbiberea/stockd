import React from "react";
import { Grid, makeStyles, createStyles } from "@material-ui/core";
import StockItem from "./StockItem";
import { StocksOverviewProps } from "./ShopTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      overflow: "auto",
    },
  })
);

const StocksOverview: React.FC<StocksOverviewProps> = ({ stocks }: StocksOverviewProps) => {
  const classes = useStyles();

  const stockItems = Object.entries(stocks).map(([name, { icon, stock }]) => (
    <Grid item xs={12} md={6} xl={4} key={name}>
      <StockItem icon={icon} name={name} stock={stock} />
    </Grid>
  ));

  return (
    <Grid container className={classes.container}>
      {stockItems}
    </Grid>
  );
};

export default StocksOverview;
