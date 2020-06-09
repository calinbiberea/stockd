import React from "react";
import { Button, Card, Typography, makeStyles, createStyles } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarIcon from "@material-ui/icons/Star";
import Rating from "@material-ui/lab/Rating";
import ShopHeader from "../shop/ShopHeader";
import { ShopListItemProps } from "./ShopListTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    shopCard: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "30vw",
        height: "25vh",
      },
      [theme.breakpoints.down("xs")]: {
        width: "80vw",
        height: "25vh",
      },
    },
    shopContent: {
      width: "100%",
      flex: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      margin: "0 auto",
      textTransform: "none",
      fontSize: "14px",
    },
    buttonIcon: {
      marginLeft: "8px",
    },
  })
);

const ShopListItem: React.FC<ShopListItemProps> = ({
  shopData,
  startTime,
  endTime,
  onGetDetailsClick,
}: ShopListItemProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.shopCard}>
      <ShopHeader locationData={shopData.locationData} />

      <div className={classes.shopContent}>
        <Typography>Distance: {shopData.distance.toFixed(2)}km</Typography>

        <Typography>Safety score:</Typography>

        <Rating
          defaultValue={
            ((shopData.displayed as Record<string, unknown>)?.safetyScore || 0) as number
          }
          precision={0.5}
          emptyIcon={<StarIcon fontSize="inherit" />}
          readOnly
        />

        <Typography>
          Opening times: {startTime} - {endTime}
        </Typography>
      </div>

      <Button
        variant="contained"
        size="large"
        color="secondary"
        className={classes.button}
        onClick={() => onGetDetailsClick(shopData.locationData)}
      >
        Click here for details
        <MoreHorizIcon className={classes.buttonIcon} />
      </Button>
    </Card>
  );
};

export default ShopListItem;
