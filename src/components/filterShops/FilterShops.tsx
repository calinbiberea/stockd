import React, { useState } from "react";
import { Button, Card, Checkbox, FormControlLabel, FormGroup, Typography } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import { FilterShopsProps, Product, products, SafetyRating } from "./FilterShopsTypes.d";
import SafetySlider from "./SafetySlider";
import ProductSelector from "./ProductSelector";
import Header from "../header/Header";
import LocationSearch from "./LocationSearch";
import ShopList from "../shopList/ShopList";
import { getCurrentLocation } from "../../util/geolocate";

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

const defaultSelectedProducts = Object.fromEntries(products.map((product) => [product, false])) as {
  [p in Product]: boolean;
};

const FilterShops: React.FC<FilterShopsProps> = ({ setRoute }: FilterShopsProps) => {
  const [selectedProducts, setSelectedProducts] = useState<{ [p in Product]: boolean }>(
    defaultSelectedProducts
  );
  const [minSafetyScore, setMinSafetyScore] = useState<SafetyRating>(0);
  const [selectedPlace, setSelectedPlace] = useState<AutocompletePrediction | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleProduct = (product: Product) => {
    const newSelected = Object.assign({}, selectedProducts) as { [p in Product]: boolean };
    if (newSelected[product] !== undefined) {
      newSelected[product] = !newSelected[product];
      setSelectedProducts(newSelected);
    }
  };

  const toggleGeolocation = async (enabled: boolean) => {
    setUseCurrentLocation(enabled);
    if (enabled) {
      setCurrentLocation(await getCurrentLocation());
    }
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
    const location = getLocation();
    return (
      <ShopList
        onBackClick={() => setSubmitted(false)}
        filters={{ products, minSafetyScore }}
        location={location}
      />
    );
  }

  const canSubmit = useCurrentLocation ? currentLocation !== null : selectedPlace !== null;

  return (
    <div style={containerStyle}>
      <Header title="Stockd" onBackClick={() => setRoute("landing")} />

      <Card style={subtitleContainerStyle} variant={"outlined"}>
        <Typography variant="h4" color="primary">
          What are you looking for?
        </Typography>
      </Card>

      <div style={contentContainerStyle}>
        <ProductSelector
          selected={selectedProducts}
          onSelect={toggleProduct}
          onReset={() => setSelectedProducts(defaultSelectedProducts)}
        />

        <SafetySlider minRating={minSafetyScore} setMinRating={setMinSafetyScore} />

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
