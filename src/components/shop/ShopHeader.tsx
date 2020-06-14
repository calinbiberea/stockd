import React from "react";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { ShopHeaderProps } from "./ShopTypes";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import colors from "../../res/colors";
import envVars from "../../util/envVars";

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonIcon: {
      position: "absolute",
      [theme.breakpoints.down("xs")]: {
        width: "20px",
        height: "20px",
      },
    },
    backButton: {
      position: "absolute",
      color: "#FFF",
      marginLeft: "12px",
      backgroundColor: colors.blue1,
      [theme.breakpoints.down("xs")]: {
        width: "20px",
        height: "20px",
        marginTop: "50px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "35px",
        height: "35px",
        marginTop: "20px",
      },
    },
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      backgroundColor: theme.palette.primary.main,
    },
    imgAndText: {
      width: "100%",
      height: "100%",
      display: "flex",

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column-reverse",
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
    },
    imgContainer: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: "50%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "50%",
        height: "100%",
      },
      display: "flex",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    nameRoadContainer: {
      margin: "0 8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: "50%",
        flexDirection: "row",
      },
      [theme.breakpoints.up("sm")]: {
        width: "50%",
        height: "100%",
        flexDirection: "column",
      },
    },
    name: {
      color: "#FFF",
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        width: "50%",
        fontSize: "4vw",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
    },
    divider: {
      height: "5%",
    },
    road: {
      color: theme.palette.secondary.main,
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        width: "50%",
        fontSize: "3vw",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
    },
  })
);

const getPhotoUrl = (reference: unknown, maxWidth = 500): string | null => {
  if (typeof reference !== "string") {
    return null;
  }
  const endpoint = "https://maps.googleapis.com/maps/api/place/photo";
  const apiKey = envVars.googleMapsKey.value;
  const url = `${endpoint}?key=${apiKey}&photoreference=${reference}&maxwidth=${maxWidth}`;
  return url;
};

export const ShopHeader: React.FC<ShopHeaderProps> = ({
  locationData,
  noBackButton,
  onBackClick,
}: ShopHeaderProps) => {
  const classes = useStyles();
  const photo = locationData.photo ?? getPhotoUrl(locationData.photoReference);
  return (
    <div className={classes.container}>
      {noBackButton ? null : (
        <IconButton
          edge="start"
          aria-label="back"
          onClick={onBackClick}
          className={classes.backButton}
        >
          <ArrowBackIcon className={classes.buttonIcon} />
        </IconButton>
      )}

      <div className={classes.imgAndText}>
        <div
          style={photo !== null ? { backgroundImage: `url(${photo})` } : {}}
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
    </div>
  );
};

export default ShopHeader;
