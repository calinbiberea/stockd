import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  createStyles,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import { useSnackbar } from "notistack";
import GoogleIcon from "../../res/google.png";
import FacebookIcon from "../../res/facebook.png";
import { setLocationState, toggleGeolocationState } from "../../util/geolocate";
import { DISTANCES, useFilterScreenStyles } from "../../util/consts";
import Header from "../header/Header";
import LocationSearch from "../filterShops/LocationSearch";
import ShopResults from "../shopResults/ShopResults";
import { FindShopProps } from "./FindShopTypes";
import { LoginContext } from "../App";
import { logIn, logOut, Provider } from "../../firebase/firebaseLogin";
import { makeStyles } from "@material-ui/core/styles";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      width: "32px",
      height: "32px",
    },
    flexRow: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

const FindShop: React.FC<FindShopProps> = ({ editShop = false, setRoute }: FindShopProps) => {
  const [maxDistance, setMaxDistance] = useState(DISTANCES[0]);
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePrediction | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { uid, setUid } = useContext(LoginContext);

  const classes = useStyles();
  const filterScreenClasses = useFilterScreenStyles();

  const { enqueueSnackbar } = useSnackbar();

  const toggleGeolocation = toggleGeolocationState(
    setCurrentLocation,
    setUseCurrentLocation,
    enqueueSnackbar
  );

  const getLocation = setLocationState(
    useCurrentLocation,
    currentLocation as Position,
    selectedPlace as AutocompletePrediction
  );

  if (submitted) {
    const location = getLocation();
    const products = [] as string[];
    const safetyFeatures = [] as string[];
    const nameFilter = true;

    return (
      <ShopResults
        onBackClick={() => setSubmitted(false)}
        filters={{ editShop, nameFilter, products, safetyFeatures, maxDistance }}
        location={location}
      />
    );
  }

  const canSubmit =
    (useCurrentLocation ? currentLocation !== null : selectedPlace !== null) &&
    (!editShop || uid !== null);

  const performLogin = (provider: Provider) => async () => {
    const uid = await logIn(provider, enqueueSnackbar);
    if (uid !== null) {
      setUid(uid);
    }
  };

  const performLogout = async () => {
    await logOut();
    enqueueSnackbar("You've logged out.", { variant: "info" });
    setUid(null);
  };

  let login = undefined;
  if (editShop) {
    if (uid === null) {
      login = (
        <div className={classes.flexRow}>
          <Typography>
            <i>Please log in to contribute: </i>
          </Typography>
          &nbsp;&nbsp;
          <IconButton onClick={performLogin("google")} size="small">
            <img src={GoogleIcon} alt="Log in with Google" className={classes.icon} />
          </IconButton>
          &nbsp;
          <IconButton onClick={performLogin("facebook")} size="small">
            <img src={FacebookIcon} alt="Log in with Facebook" className={classes.icon} />
          </IconButton>
        </div>
      );
    } else {
      login = (
        <div className={classes.flexRow}>
          <Typography>
            <i>Logged in.</i>
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={performLogout} variant="contained" color="primary" size="small">
            Log out
          </Button>
        </div>
      );
    }
  }

  return (
    <div className={filterScreenClasses.container}>
      <Header onBackClick={() => setRoute("landing")} />

      <Typography variant="h4" color="primary" className={filterScreenClasses.title}>
        Which shop are you looking for?
      </Typography>

      <div className={filterScreenClasses.contentContainer}>
        <FormGroup row className={filterScreenClasses.locationContainer}>
          <FormControl className={filterScreenClasses.distanceSelect}>
            <InputLabel>Max. distance</InputLabel>

            <Select
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value as string))}
            >
              {DISTANCES.map((x) => (
                <MenuItem key={x} value={x}>{`${x}km`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider
            orientation="vertical"
            flexItem
            className={filterScreenClasses.locationDivider}
          />

          <LocationSearch
            enabled={!useCurrentLocation}
            location={selectedPlace}
            setLocation={setSelectedPlace}
          />

          <FormControlLabel
            label="Use current location"
            control={
              <Checkbox
                color="primary"
                checked={useCurrentLocation}
                onChange={(event) => toggleGeolocation(event.target.checked)}
              />
            }
          />
        </FormGroup>
      </div>

      {login}

      <Button
        size="large"
        color="primary"
        variant="contained"
        disabled={!canSubmit}
        onClick={() => setSubmitted(true)}
        className={filterScreenClasses.button}
      >
        <Typography variant="h6">{"Let's go!"}</Typography>

        <ArrowIcon className={filterScreenClasses.buttonIcon} />
      </Button>
    </div>
  );
};

export default FindShop;
