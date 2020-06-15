import React from "react";
import { Grid, useMediaQuery, Theme, makeStyles, createStyles } from "@material-ui/core/";
import { SafetyFeatureId, safetyFeatures } from "../../../util/productsAndSafetyFeatures";
import { SafetyOverviewProps } from "../ShopTypes";
import SafetyScore from "./SafetyScore";
import SafetyItem from "./SafetyItem";
import { Typography } from "@material-ui/core";
import { safetyStrings } from "../../../util/safetyStrings";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "auto",
    },
    safetyScoreContainer: {
      flex: 1,
      margin: "16px 0 8px",
    },
    gridContainer: {
      flex: 4,
      overflow: "auto",
    },
  })
);

const SafetyOverview: React.FC<SafetyOverviewProps> = ({
  safetyScore,
  usedSafetyFeatures,
}: SafetyOverviewProps) => {
  const classes = useStyles();

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

  let safetyString;
  if (safetyScore !== undefined) {
    safetyString = <i>{`"${safetyStrings[Math.ceil(safetyScore) as 1 | 2 | 3 | 4 | 5]}"`}</i>;
  } else {
    safetyString = undefined;
  }

  const safetyItems = Object.keys(safetyFeatures).map((feature) => (
    <Grid item xs={12} md={6} xl={4} key={feature}>
      <SafetyItem
        feature={feature as SafetyFeatureId}
        value={usedSafetyFeatures[feature as SafetyFeatureId]}
      />
    </Grid>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.safetyScoreContainer}>
        <SafetyScore safetyScore={safetyScore} size={smallScreen ? "medium" : "large"} />
        <Typography style={{ textAlign: "center" }}>{safetyString}</Typography>
      </div>

      <Grid container className={classes.gridContainer}>
        {safetyItems}
      </Grid>
    </div>
  );
};

export default SafetyOverview;
