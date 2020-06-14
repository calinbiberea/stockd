import React from "react";
import { Button, Card, Typography, makeStyles, createStyles } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShopHeader from "../shop/ShopHeader";
import SafetyScore from "../shop/safety/SafetyScore";
import { ShopListItemProps } from "./ShopResultsTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "40vw",
        height: "25vh",
      },
      [theme.breakpoints.down("xs")]: {
        width: "80vw",
        height: "25vh",
      },
    },
    headerContainer: {
      flex: 1,
    },
    contentContainer: {
      flex: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      margin: "0 auto 8px",
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

  const displayed = shopData.displayed as Record<string, unknown>;
  const safetyScore =
    typeof displayed?.safetyRating === "number" && !isNaN(displayed.safetyRating) ? (
      <SafetyScore safetyScore={displayed.safetyRating as number} />
    ) : undefined;

  return (
    <Card className={classes.container}>
      <div className={classes.headerContainer}>
        <ShopHeader locationData={shopData.locationData} noBackButton />
      </div>

      <div className={classes.contentContainer}>
        <Typography>Distance: {shopData.distance.toFixed(2)}km</Typography>

        {safetyScore}

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
