import React, { useState } from "react";
import {
  Button,
  Checkbox,
  createStyles,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import Header from "../header/Header";
import LocationSearch from "../filterShops/LocationSearch";
import ShopList from "../shopList/ShopList";
import { getCurrentLocation } from "../../util/geolocate";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { FindShopProps } from "./FindShopTypes";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      overflowY: "scroll",
    },
    title: {
      margin: "20px",
    },
    contentContainer: {
      margin: "20px",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    distanceSelect: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    submitDivider: {
      margin: `0px ${theme.spacing(2)}px`,
    },
    button: {
      margin: "auto 20px",
      flex: "0",
    },
  })
);

const FindShop: React.FC<FindShopProps> = ({ setRoute }: FindShopProps) => {
  const [shopName, setShopName] = useState("");
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
      <ShopList
        onBackClick={() => setSubmitted(false)}
        filters={{ nameFilter, shopName, products, safetyFeatures, maxDistance }}
        location={location}
      />
    );
  }

  const canSubmit =
    shopName !== "" && (useCurrentLocation ? currentLocation !== null : selectedPlace !== null);

  return (
    <div className={classes.container}>
      <Header onBackClick={() => setRoute("landing")} />

      <Typography className={classes.title} variant="h4" color="primary">
        Which shop are you looking for?
      </Typography>

      <div>
        <TextField
          required
          id="outlined-required"
          label="Enter shop name"
          variant="outlined"
          defaultValue={shopName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShopName(e.target.value)}
        />

        <div className={classes.contentContainer}>
          <FormGroup row>
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
            <Divider className={classes.submitDivider} orientation="vertical" flexItem />
            <LocationSearch
              enabled={!useCurrentLocation}
              location={selectedPlace}
              setLocation={setSelectedPlace}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={useCurrentLocation}
                  onChange={(event) => toggleGeolocation(event.target.checked)}
                />
              }
              label="Use current location"
            />
          </FormGroup>
        </div>

        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={() => setSubmitted(true)}
          className={classes.button}
          disabled={!canSubmit}
        >
          <Typography variant="h6">{"Let's go!"}</Typography>

          <ArrowIcon style={{ marginLeft: "16px" }} />
        </Button>
      </div>
    </div>
  );
};

export default FindShop;
