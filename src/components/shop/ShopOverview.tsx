import React from "react";
import { Button, Grid, makeStyles, createStyles } from "@material-ui/core";
import StockItem from "./StockItem";
import { ShopOverviewProps } from "./ShopTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flex: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "12px",
      overflow: "auto",
    },
    gridContainer: {
      flex: 1,
      flexDirection: "row",
      overflow: "auto",
    },
    gridItem: {
      width: "50%",
    },
  })
);

const ShopOverview: React.FC<ShopOverviewProps> = ({ stocks, locationData }: ShopOverviewProps) => {
  const classes = useStyles();

  const stockItems = Object.entries(stocks).map(([name, { icon, stock }]) => (
    <Grid item key={name} className={classes.gridItem}>
      <StockItem icon={icon} name={name} stock={stock} />
    </Grid>
  ));

  const onButtonClick = () => {
    const getMapsUrl = (placeName: string, placeId: string) =>
      `https://www.google.com/maps/search/?api=1&query=${encodeURI(
        placeName
      )}&query_place_id=${placeId}`;

    window.open(getMapsUrl(locationData.name, locationData.id));
  };

  return (
    <div className={classes.container}>
      <Grid container className={classes.gridContainer}>
        {stockItems}
      </Grid>

      <Button variant="contained" color="primary" onClick={onButtonClick}>
        Take me there
      </Button>
    </div>
  );
};

export default ShopOverview;
