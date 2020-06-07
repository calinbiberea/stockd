import React, { useState } from "react";
import { Button, Card, Checkbox, FormControlLabel, FormGroup, Typography } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import { FilterShopsProps } from "./FilterShopsTypes.d";
import SelectorPanel from "./SelectorPanel";
import Header from "../header/Header";
import LocationSearch from "./LocationSearch";
import ShopList from "../shopList/ShopList";
import {
  products,
  safetyFeatures,
  Product,
  SafetyFeature,
  ProductId, SafetyFeatureId,
} from "../../util/productsAndSafetyFeatures";
import { getCurrentLocation } from "../../util/geolocate";
import { useSnackbar } from "notistack";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
};

const subtitleContainerStyle = {
  margin: "20px",
  padding: "20px",
};

const contentContainerStyle = {
  margin: "20px",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
};

const buttonStyle = {
  textTransform: "none" as const,
};

const defaultSelectedProducts = Object.fromEntries(
  Object.keys(products).map((productId) => [productId, false])
) as {
  [p in ProductId]: boolean;
};

const defaultSelectedSafetyFeatures = Object.fromEntries(
  Object.keys(safetyFeatures).map((safetyFeatureId) => [safetyFeatureId, false])
) as {
  [f in SafetyFeatureId]: boolean;
};

const FilterShops: React.FC<FilterShopsProps> = ({ setRoute }: FilterShopsProps) => {
  const [selectedProducts, setSelectedProducts] = useState<{ [p in ProductId]: boolean }>(
    defaultSelectedProducts
  );
  const [selectedSafetyFeatures, setSelectedSafetyFeatures] = useState<
    { [f in SafetyFeatureId]: boolean }
  >(defaultSelectedSafetyFeatures);
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePrediction | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const toggleProduct = (product: ProductId) => {
    const newSelected = Object.assign({}, selectedProducts) as { [p in ProductId]: boolean };
    if (newSelected[product] !== undefined) {
      newSelected[product] = !newSelected[product];
      setSelectedProducts(newSelected);
    }
  };

  const toggleSafetyFeature = (feature: SafetyFeatureId) => {
    const newSelected = Object.assign({}, selectedSafetyFeatures) as {
      [f in SafetyFeatureId]: boolean;
    };
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
        filters={{ products, safetyFeatures }}
        location={location}
      />
    );
  }

  const canSubmit = useCurrentLocation ? currentLocation !== null : selectedPlace !== null;

  return (
    <div style={containerStyle}>
      <Header onBackClick={() => setRoute("landing")} />

      <Card style={subtitleContainerStyle} variant={"outlined"}>
        <Typography variant="h4" color="primary">
          What are you looking for?
        </Typography>
      </Card>

      <div style={contentContainerStyle}>
        <SelectorPanel
          title="ProductsAndSafetyFeatures"
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

        {/*<SafetyFilters minRating={minSafetyScore} setMinRating={setMinSafetyScore} />*/}

        <FormGroup row>
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
        style={buttonStyle}
        disabled={!canSubmit}
      >
        <Typography variant="h6">{"Let's go!"}</Typography>

        <ArrowIcon style={{ marginLeft: "16px" }} />
      </Button>
    </div>
  );
};

export default FilterShops;
