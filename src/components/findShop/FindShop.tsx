import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import { useSnackbar } from "notistack";
import { FindShopProps } from "./FindShopTypes";
import Header from "../header/Header";
import LocationSearch from "../filterShops/LocationSearch";
import ShopResults from "../shopResults/ShopResults";
import { getCurrentLocation } from "../../util/geolocate";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "auto",
    },
    title: {
      padding: "20px",
    },
    contentContainer: {
      margin: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    locationContainer: {
      marginTop: "8px",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    distanceSelect: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    locationDivider: {
      margin: `0px ${theme.spacing(2)}px`,
      [theme.breakpoints.down("xs")]: {
        visibility: "hidden",
      },
    },
    button: {
      margin: "auto 20px 16px",
      flex: 0,
    },
    buttonIcon: {
      marginLeft: "16px",
    },
  })
);

const FindShop: React.FC<FindShopProps> = ({ editShop, setRoute }: FindShopProps) => {
  const [maxDistance, setMaxDistance] = useState(50);
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePrediction | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const toggleGeolocation = async (enabled: boolean) => {
    let newUseCurrentLocation = enabled;
    if (enabled) {
      const maybeCurrentLocation = await getCurrentLocation(enqueueSnackbar);

      if (maybeCurrentLocation === null) {
        newUseCurrentLocation = false;
      }

      setCurrentLocation(maybeCurrentLocation);
    }

    setUseCurrentLocation(newUseCurrentLocation);
  };

  const getLocation = () => {
    if (useCurrentLocation) {
      const coords = (currentLocation as Position).coords;

      return {
        geolocated: true as const,
        lat: coords.latitude,
        lng: coords.longitude,
      };
    } else {
      return {
        geolocated: false as const,
        placeId: (selectedPlace as AutocompletePrediction).place_id,
      };
    }
  };

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

  const canSubmit = useCurrentLocation ? currentLocation !== null : selectedPlace !== null;

  return (
    <div className={classes.container}>
      <Header onBackClick={() => setRoute("landing")} />

      <Typography variant="h4" color="primary" className={classes.title}>
        Which shop are you looking for?
      </Typography>

      <div className={classes.contentContainer}>
        <FormGroup row className={classes.locationContainer}>
          <FormControl className={classes.distanceSelect}>
            <InputLabel>Max. distance</InputLabel>

            <Select
              value={maxDistance}
              onChange={(e) => setMaxDistance(parseInt(e.target.value as string))}
            >
              <MenuItem value={10}>10km</MenuItem>

              <MenuItem value={25}>25km</MenuItem>

              <MenuItem value={50}>50km</MenuItem>
            </Select>
          </FormControl>

          <Divider orientation="vertical" flexItem className={classes.locationDivider} />

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

      <Button
        size="large"
        color="primary"
        variant="contained"
        disabled={!canSubmit}
        onClick={() => setSubmitted(true)}
        className={classes.button}
      >
        <Typography variant="h6">{"Let's go!"}</Typography>

        <ArrowIcon className={classes.buttonIcon} />
      </Button>
    </div>
  );
};

export default FindShop;
