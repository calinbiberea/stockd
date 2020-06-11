import React from "react";
import { Grid, useMediaQuery, Theme, makeStyles, createStyles } from "@material-ui/core/";
import SafetyScore from "./SafetyScore";
import SafetyItem from "./SafetyItem";
import { SafetyOverviewProps } from "./ShopTypes";

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
  safetyFeatures,
}: SafetyOverviewProps) => {
  const classes = useStyles();

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

  const safetyItems = Object.entries(safetyFeatures).map(([name, value]) => (
    <Grid item xs={12} md={6} xl={4} key={name}>
      <SafetyItem key={name} name={name} value={value} />
    </Grid>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.safetyScoreContainer}>
        <SafetyScore safetyScore={safetyScore} size={smallScreen ? "medium" : "large"} />
      </div>

      <Grid container className={classes.gridContainer}>
        {safetyItems}
      </Grid>
    </div>
  );
};

export default SafetyOverview;
