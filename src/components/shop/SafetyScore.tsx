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
  setSafetyScore,
  size = "small",
}: SafetyScoreProps) => {
  const classes = useStyles();

  const canEdit = setSafetyScore !== undefined;

  const getTypographySize = () => {
    if (size === "small") {
      return "body1";
    } else if (size === "medium") {
      return "subtitle1";
    } else if (size === "large") {
      return "h5";
    }
  };

  const onChange = (event: React.ChangeEvent<unknown>, newValue: number | null) => {
    if (setSafetyScore && newValue) {
      setSafetyScore(newValue);
    } else return;
  };

  return (
    <div className={classes.container}>
      <Typography variant={getTypographySize()}>Safety score:</Typography>

      <Rating
        size={size}
        defaultValue={canEdit ? undefined : safetyScore}
        value={canEdit ? safetyScore : undefined}
        onChange={onChange}
        precision={0.5}
        emptyIcon={<StarIcon fontSize="inherit" />}
        readOnly={!canEdit}
        name="Safety Rating"
      />
    </div>
  );
};

export default SafetyScore;
