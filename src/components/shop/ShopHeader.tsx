import React, { Props } from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { ShopHeaderProps } from "./ShopTypes";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) =>
  createStyles({
    backButton: {
      color: "#FFF",
    },
    container: {
      height: "100%",
      backgroundColor: theme.palette.primary.main,
      display: "flex",

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column-reverse"
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row"
      },
    },
    imgContainer: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: "50%" ,
      },
      [theme.breakpoints.up("sm")]: {
        width: "50%",
        height: "100%" ,
      },
      display: "flex",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    nameRoadContainer: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: "50%" ,
        flexDirection: "row",
      },
      [theme.breakpoints.up("sm")]: {
        width: "50%",
        height: "100%" ,
        flexDirection: "column",
      },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      color: "#FFF",
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "5%",
        padding: "3%",
        width: "60%",
        fontSize: "4vw",
        display: "flex",
      },
    },
    divider: {
      height: "5%",
    },
    road: {
      [theme.breakpoints.down("xs")]: {
        padding: "3%",
        width: "40%",
        fontSize: "3vw",
        display: "flex",
      },
      color: theme.palette.secondary.main,
    },
  })
);

export const ShopHeader: React.FC<ShopHeaderProps> = ({ locationData, noBackButton, onBackClick }: ShopHeaderProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {noBackButton ? null :
        <IconButton
          edge="start"
          aria-label="back"
          onClick={onBackClick}
        >
          <ArrowBackIcon />
        </IconButton>
      }
      <div
        style={{ backgroundImage: `url(${locationData.photo})` }}
        className={classes.imgContainer}
      />

      <div className={classes.nameRoadContainer}>
        <Typography noWrap variant="h6" className={classes.name}>
          {locationData.name}
        </Typography>

        <div className={classes.divider} />

        <Typography noWrap variant="subtitle1" className={classes.road}>
          {locationData.road}
        </Typography>
      </div>
    </div>
  );
};

export default ShopHeader;
