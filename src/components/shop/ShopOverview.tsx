import React from "react";
import { Button, Grid, makeStyles, createStyles } from "@material-ui/core";
import StockItem from "./StockItem";
import { ShopOverviewProps } from "./ShopTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    gridContainer: {
      overflow: "auto",
    },
  })
);

const ShopOverview: React.FC<ShopOverviewProps> = ({ stocks, locationData }: ShopOverviewProps) => {
  const classes = useStyles();

  const stockItems = Object.entries(stocks).map(([name, { icon, stock }]) => (
    <Grid item xs={12} md={6} xl={4} key={name}>
      <StockItem icon={icon} name={name} stock={stock} />
    </Grid>
  ));

  const onButtonClick = () => {
    const getMapsUrl = (placeName: string, placeId: string) => {
      const encodedName = encodeURI(placeName);

      return `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${placeId}`;
    };

    window.open(getMapsUrl(locationData.name, locationData.id));
  };

  return (
    <div className={classes.container}>
      <Grid container className={classes.gridContainer}>
        {stockItems}
      </Grid>

      <Button variant="contained" color="primary" onClick={onButtonClick}>
        Take me there!
      </Button>
    </div>
  );
};

export default ShopOverview;
