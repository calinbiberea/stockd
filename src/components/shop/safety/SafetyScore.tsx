import React from "react";
import { Typography, makeStyles, createStyles, withStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarIcon from "@material-ui/icons/Star";
import colors from "../../../res/colors";
import { SafetyScoreProps } from "../ShopTypes";

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
  setHover,
  size = "small",
  updated = true,
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

  const ColoredRating = withStyles({
    iconFilled: {
      color: updated ? colors.blue1 : colors.blue3,
    },
    iconHover: {
      color: colors.blue2,
    },
  })(Rating);

  return (
    <div className={classes.container}>
      <Typography variant={getTypographySize()}>Safety score:</Typography>

      <ColoredRating
        size={size}
        defaultValue={canEdit ? undefined : safetyScore}
        value={canEdit ? safetyScore : undefined}
        onChange={onChange}
        onChangeActive={(e, newHover) => {
          if (setHover !== undefined) {
            setHover(newHover);
          }
        }}
        precision={0.5}
        emptyIcon={<StarIcon fontSize="inherit" />}
        readOnly={!canEdit}
        name="Safety Rating"
      />
    </div>
  );
};

export default SafetyScore;
