import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { ShopHeaderProps } from "./ShopTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      backgroundColor: theme.palette.primary.main,
    },
    imgContainer: {
      width: "50%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    nameRoadContainer: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      color: "#FFF",
    },
    divider: {
      height: "5%",
    },
    road: {
      color: theme.palette.secondary.main,
    },
  })
);

export const ShopHeader: React.FC<ShopHeaderProps> = ({ locationData }: ShopHeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        style={{ backgroundImage: `url(${locationData.photo})` }}
        className={classes.imgContainer}
      />

      <div className={classes.nameRoadContainer}>
        <Typography variant="h6" className={classes.name}>
          {locationData.name}
        </Typography>

        <div className={classes.divider} />

        <Typography variant="subtitle1" className={classes.road}>
          {locationData.road}
        </Typography>
      </div>
    </div>
  );
};

export default ShopHeader;
