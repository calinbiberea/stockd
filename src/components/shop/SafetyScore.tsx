import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarIcon from "@material-ui/icons/Star";
import { SafetyScoreProps } from "./ShopTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
  })
);

const SafetyScore: React.FC<SafetyScoreProps> = ({ safetyScore }: SafetyScoreProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography>Safety score:</Typography>

      <Rating
        defaultValue={safetyScore}
        precision={0.5}
        emptyIcon={<StarIcon fontSize="inherit" />}
        readOnly
      />
    </div>
  );
};

export default SafetyScore;
