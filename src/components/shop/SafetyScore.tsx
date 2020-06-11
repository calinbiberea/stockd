import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarIcon from "@material-ui/icons/Star";
import { SafetyScoreProps } from "./ShopTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
  })
);

const SafetyScore: React.FC<SafetyScoreProps> = ({
  safetyScore,
  size = "small",
}: SafetyScoreProps) => {
  const classes = useStyles();

  const getTypographySize = () => {
    if (size === "small") {
      return "body1";
    } else if (size === "medium") {
      return "subtitle1";
    } else if (size === "large") {
      return "h5";
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant={getTypographySize()}>Safety score:</Typography>

      <Rating
        size={size}
        defaultValue={safetyScore}
        precision={0.5}
        emptyIcon={<StarIcon fontSize="inherit" />}
        readOnly
      />
    </div>
  );
};

export default SafetyScore;
