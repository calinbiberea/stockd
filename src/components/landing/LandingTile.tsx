import React from "react";
import { Button, Card, Typography, makeStyles, createStyles } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import LandingScrollText from "./LandingScrollText";
import type { LandingTileProps } from "./LandingTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      padding: "20px",
      textAlign: "center",
    },
    scrollTextContainer: {
      margin: "10px 0",
      height: "20px",
    },
    button: {
      textTransform: "none",
      fontSize: "18px",
    },
    buttonIcon: {
      marginLeft: "10px",
    },
  })
);

const LandingTile: React.FC<LandingTileProps> = ({
  headerText,
  items,
  buttonText,
  onClick,
}: LandingTileProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card variant={"outlined"} className={classes.card}>
        <Typography variant="subtitle1">{headerText}</Typography>

        <div className={classes.scrollTextContainer}>
          &nbsp;
          <LandingScrollText items={items} />
        </div>

        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={onClick}
          className={classes.button}
        >
          {buttonText}
          <ArrowIcon className={classes.buttonIcon} />
        </Button>
      </Card>
    </div>
  );
};

export default LandingTile;
