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
  Typography,
} from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import { useSnackbar } from "notistack";
import { setLocationState, toggleGeolocationState } from "../../util/geolocate";
import { DISTANCES, useFilterScreenStyles } from "../../util/consts";
import Header from "../header/Header";
import LocationSearch from "../filterShops/LocationSearch";
import ShopResults from "../shopResults/ShopResults";
import { FindShopProps } from "./FindShopTypes";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

const FindShop: React.FC<FindShopProps> = ({ editShop, setRoute }: FindShopProps) => {
  const [maxDistance, setMaxDistance] = useState(DISTANCES[0]);
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePrediction | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const classes = useFilterScreenStyles();

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
              {DISTANCES.map((x) => (
                <MenuItem key={x} value={x}>{`${x}km`}</MenuItem>
              ))}
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
