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
import {
  products,
  safetyFeatures,
  ProductId,
  SafetyFeatureId,
} from "../../util/productsAndSafetyFeatures";
import { setLocationState, toggleGeolocationState } from "../../util/geolocate";
import { DISTANCES, useFilterScreenStyles } from "../../util/consts";
import Header from "../header/Header";
import ShopResults from "../shopResults/ShopResults";
import { FilterShopsProps } from "./FilterShopsTypes";
import SelectorPanel from "./SelectorPanel";
import LocationSearch from "./LocationSearch";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

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
  const [maxDistance, setMaxDistance] = useState(DISTANCES[0]);
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePrediction | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const classes = useFilterScreenStyles();

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
    const products = Object.entries(selectedProducts)
      .filter(([_, selected]) => selected)
      .map(([product]) => product);

    const safetyFeatures = Object.entries(selectedSafetyFeatures)
      .filter(([_, selected]) => selected)
      .map(([feature]) => feature);

    const location = getLocation();
    const nameFilter = false;
    const editShop = false;

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
              {DISTANCES.map((x) => (
                <MenuItem key={x} value={x}>{`${x}km`}</MenuItem>
              ))}
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
