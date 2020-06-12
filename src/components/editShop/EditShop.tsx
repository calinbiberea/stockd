import React, { useState, useContext } from "react";
import {
  Backdrop,
  Button,
  Card,
  IconButton,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import Overlay from "../overlay/Overlay";
import Header from "../header/Header";
import Map from "../map/Map";
import { EditShopProps } from "./EditShopTypes";
import { LoginContext } from "../App";
import GoogleIcon from "../../res/google.png";
import FacebookIcon from "../../res/facebook.png";
import { Provider, logIn } from "../../firebase/firebaseLogin";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(() =>
  createStyles({
    backdrop: {
      zIndex: 2001,
    },
    cardContainer: {
      textAlign: "center",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    },
    iconContainer: {
      margin: "24px 0",
    },
    icon: {
      width: "48px",
      height: "48px",
    },
  })
);

const defaultCenter = {
  lat: 51.49788,
  lng: -0.183699,
};

const EditShop: React.FC<EditShopProps> = ({ setRoute }: EditShopProps) => {
  const [currentPlaceId, setCurrentPlaceId] = useState("");

  const { uid, setUid } = useContext(LoginContext);

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const onBackClick = () => setRoute("landing");
  const closeOverlay = () => setCurrentPlaceId("");
  const onPlaceClick = (placeId: string) => setCurrentPlaceId(placeId);

  const performLogin = (provider: Provider) => async () => {
    const uid = await logIn(provider, enqueueSnackbar);
    if (uid !== null) {
      setUid(uid);
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={uid === null} onClick={onBackClick}>
        <Card onClick={(e) => e.stopPropagation()} className={classes.cardContainer}>
          <Typography>Please log in to contribute data:</Typography>

          <div className={classes.iconContainer}>
            <IconButton onClick={performLogin("google")}>
              <img src={GoogleIcon} alt="Log in with Google" className={classes.icon} />
            </IconButton>

            <IconButton onClick={performLogin("facebook")}>
              <img src={FacebookIcon} alt="Log in with Facebook" className={classes.icon} />
            </IconButton>
          </div>

          <Button variant="contained" color="primary" size="small" onClick={onBackClick}>
            Go back
          </Button>
        </Card>
      </Backdrop>

      <Header onBackClick={onBackClick} />

      <Overlay placeId={currentPlaceId} closeOverlay={closeOverlay} queryMap edit />

      <Map onPlaceClick={onPlaceClick} currentCenter={defaultCenter} showGoogleMarkers />
    </>
  );
};

export default EditShop;
