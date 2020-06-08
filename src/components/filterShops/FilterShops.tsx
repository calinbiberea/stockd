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
  makeStyles,
  createStyles,
} from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import { FilterShopsProps } from "./FilterShopsTypes.d";
import SelectorPanel from "./SelectorPanel";
import Header from "../header/Header";
import LocationSearch from "./LocationSearch";
import ShopList from "../shopList/ShopList";
import {
  products,
  safetyFeatures,
  ProductId,
  SafetyFeatureId,
} from "../../util/productsAndSafetyFeatures";
import { getCurrentLocation } from "../../util/geolocate";
import { useSnackbar } from "notistack";

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
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "center",
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

const defaultSelectedProducts = Object.fromEntries(
  Object.keys(products).map((productId) => [productId, false])
) as { [p in ProductId]: boolean };

const defaultSelectedSafetyFeatures = Object.fromEntries(
  Object.keys(safetyFeatures).map((safetyFeatureId) => [safetyFeatureId, false])
) as { [f in SafetyFeatureId]: boolean };

const FilterShops: React.FC<FilterShopsProps> = ({ setRoute }: FilterShopsProps) => {
  const [selectedProducts, setSelectedProducts] = useState(defaultSelectedProducts);
  const [selectedSafetyFeatures, setSelectedSafetyFeatures] = useState(
    defaultSelectedSafetyFeatures
  );
  const [maxDistance, setMaxDistance] = useState(50);
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePrediction | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const toggleProduct = (product: ProductId) => {
    const newSelected = Object.assign({}, selectedProducts);

    if (newSelected[product] !== undefined) {
      newSelected[product] = !newSelected[product];
      setSelectedProducts(newSelected);
    }
  };

  const toggleSafetyFeature = (feature: SafetyFeatureId) => {
    const newSelected = Object.assign({}, selectedSafetyFeatures);

    if (newSelected[feature] !== undefined) {
      newSelected[feature] = !newSelected[feature];
      setSelectedSafetyFeatures(newSelected);
    }
  };

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
    const products = Object.entries(selectedProducts)
      .filter(([_, selected]) => selected)
      .map(([product]) => product);

    const safetyFeatures = Object.entries(selectedSafetyFeatures)
      .filter(([_, selected]) => selected)
      .map(([feature]) => feature);

    const location = getLocation();

    return (
      <ShopList
        onBackClick={() => setSubmitted(false)}
        filters={{ products, safetyFeatures, maxDistance }}
        location={location}
      />
    );
  }

  const canSubmit = useCurrentLocation ? currentLocation !== null : selectedPlace !== null;

  return (
    <div className={classes.container}>
      <Header onBackClick={() => setRoute("landing")} />

      <Typography variant="h4" color="primary" className={classes.title}>
        What are you looking for?
      </Typography>

      <div className={classes.contentContainer}>
        <SelectorPanel
          title="Products"
          selected={selectedProducts}
          items={products}
          onSelect={(p) => toggleProduct(p as ProductId)}
          onReset={() => setSelectedProducts(defaultSelectedProducts)}
        />

        <SelectorPanel
          title="Safety Features"
          selected={selectedSafetyFeatures}
          items={safetyFeatures}
          onSelect={(f) => toggleSafetyFeature(f as SafetyFeatureId)}
          onReset={() => setSelectedSafetyFeatures(defaultSelectedSafetyFeatures)}
        />

        <FormGroup className={classes.locationContainer}>
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

          <Divider className={classes.locationDivider} orientation="vertical" flexItem />

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
        onClick={() => setSubmitted(true)}
        disabled={!canSubmit}
        className={classes.button}
      >
        <Typography variant="h6">{"Let's go!"}</Typography>

        <ArrowIcon className={classes.buttonIcon} />
      </Button>
    </div>
  );
};

export default FilterShops;
