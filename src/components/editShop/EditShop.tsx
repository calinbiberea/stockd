import React, { useContext, useState } from "react";
import { Backdrop, Button, Card, IconButton } from "@material-ui/core";
import Overlay from "../overlay/Overlay";
import Header from "../header/Header";
import Map from "../map/Map";
import { EditShopProps } from "./EditShopTypes";
import { LoginContext } from "../App";
import GoogleIcon from "../../res/google.png";
import FacebookIcon from "../../res/facebook.png";
import { Provider, logIn } from "../../firebase/firebaseLogin";
import { useSnackbar } from "notistack";

const defaultCenter = {
  lat: 51.49788,
  lng: -0.183699,
};

const iconSize = "48px";

const EditShop: React.FC<EditShopProps> = ({ setRoute }: EditShopProps) => {
  const [currentPlaceId, setCurrentPlaceId] = useState("");
  const { uid, setUid } = useContext(LoginContext);
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
      <Backdrop style={{ zIndex: 2001 }} open={uid === null} onClick={onBackClick}>
        <Card onClick={(e) => e.stopPropagation()} style={{ textAlign: "center", padding: "20px" }}>
          Please log in to contribute data:
          <br />
          <br />
          <IconButton onClick={performLogin("google")}>
            <img
              alt="Log in with Google"
              src={GoogleIcon}
              style={{ width: iconSize, height: iconSize }}
            />
          </IconButton>
          <IconButton onClick={performLogin("facebook")}>
            <img
              alt="Log in with Facebook"
              src={FacebookIcon}
              style={{ width: iconSize, height: iconSize }}
            />
          </IconButton>
          <br />
          <br />
          <Button variant="contained" color="primary" size="small" onClick={onBackClick}>
            Go back
          </Button>
        </Card>
      </Backdrop>
      <Header onBackClick={onBackClick} />
      <Overlay placeId={currentPlaceId} closeOverlay={closeOverlay} queryMap defaultToStock />
      <Map onPlaceClick={onPlaceClick} currentCenter={defaultCenter} />
    </>
  );
};

export default EditShop;
