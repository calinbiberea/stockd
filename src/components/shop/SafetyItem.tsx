import React from "react";
import { Card, Typography, makeStyles, createStyles } from "@material-ui/core";
import { SafetyItemProps } from "./ShopTypes";
import { getSafetyFeature, SafetyEnabled, SafetyIcons } from "../../util/productsAndSafetyFeatures";

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

  const name = getSafetyFeature(feature);

  let enabled: SafetyEnabled;
  switch (value) {
    case true:
      enabled = "yes";
      break;
    case false:
      enabled = "no";
      break;
    case undefined:
      enabled = "unknown";
      break;
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
