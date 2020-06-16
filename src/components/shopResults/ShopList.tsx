import { createStyles, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ShopListItem from "./ShopListItem";
import { DBShopData, ShopListProps } from "./ShopResultsTypes";

const useStyles = makeStyles(() =>
  createStyles({
    contentContainer: {
      width: "100%",
      height: "93%",
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      margin: "30px",
    },
    gridContainer: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      overflow: "auto",
    },
    gridItem: {
      margin: "16px 0",
    },
  })
);

const compareByDistance = (a: DBShopData, b: DBShopData) => a.distance - b.distance;

const compareBySafetyScore = (a: DBShopData, b: DBShopData) => {
  const scoreA = ((a.displayed as Record<string, unknown>)?.safetyRating || -1) as number;
  const scoreB = ((b.displayed as Record<string, unknown>)?.safetyRating || -1) as number;

  return scoreB - scoreA;
};

const ShopList: React.FC<ShopListProps> = ({ shopList, sortBy, onShopSelect }: ShopListProps) => {
  const classes = useStyles();

  let compareFunc: (a: DBShopData, b: DBShopData) => number;
  switch (sortBy) {
    case "distance":
      compareFunc = compareByDistance;
      break;
    case "safetyScore":
      compareFunc = compareBySafetyScore;
      break;
  }

  const shopListItems = shopList
    .slice()
    .sort(compareFunc)
    .map((shop) => (
      <Grid item key={shop.id} className={classes.gridItem}>
        <ShopListItem
          shopData={shop}
          startTime={"9:00"}
          endTime={"21:00"}
          onGetDetailsClick={onShopSelect}
        />
      </Grid>
    ));

  return (
    <div className={classes.contentContainer}>
      <Typography variant="h5" color="primary" className={classes.title}>
        {shopListItems.length !== 0
          ? "Here are the shops that we found"
          : "We couldn't find any shops matching those filters."}
      </Typography>

      <Grid container direction="column" wrap="nowrap" className={classes.gridContainer}>
        {shopListItems}
      </Grid>
    </div>
  );
};

export default ShopList;
