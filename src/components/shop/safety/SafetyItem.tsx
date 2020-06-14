import React from "react";
import { Card, Typography, makeStyles, createStyles } from "@material-ui/core";
import { SafetyItemProps } from "../ShopTypes";
import {
  getSafetyFeature,
  SafetyEnabled,
  SafetyIcons,
} from "../../../util/productsAndSafetyFeatures";
import { SAFETY_FEATURE_THRESHOLD } from "../../../util/consts";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up("sm")]: {
        height: "64px",
      },
      [theme.breakpoints.down("xs")]: {
        height: "48px",
      },
      padding: "8px",
      margin: "8px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
    },
    icon: {
      maxHeight: "100%",
    },
  })
);

const SafetyItem: React.FC<SafetyItemProps> = ({ feature, value }: SafetyItemProps) => {
  const classes = useStyles();

  const { name } = getSafetyFeature(feature);

  let enabled: SafetyEnabled;
  if (value === undefined) {
    enabled = "unknown";
  } else if (value < SAFETY_FEATURE_THRESHOLD) {
    enabled = "no";
  } else {
    enabled = "yes";
  }
  const icon = SafetyIcons[feature][enabled];

  return (
    <Card className={classes.container}>
      <Typography variant="h5">{name}</Typography>

      <img src={icon} alt="Safety Item value" className={classes.icon} />
    </Card>
  );
};

export default SafetyItem;
