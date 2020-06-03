import React, { useState } from "react";
import { Button, Card, Typography } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import { FilterShopsProps, Product, products, SafetyRating } from "./FilterShopsTypes.d";
import SafetySlider from "./SafetySlider";
import ProductSelector from "./ProductSelector";
import Header from "../header/Header";
import LocationSearch from "./LocationSearch";
import { findShops } from "../../firebase/firebaseApp";
import { geocodeByPlaceId } from "../../util/googleMaps";

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
  const [minRating, setMinRating] = useState<SafetyRating>(0);
  const [location, setLocation] = useState<google.maps.places.AutocompletePrediction | null>(null);

  const toggleProduct = (product: Product) => {
    const newSelected = Object.assign({}, selectedProducts) as { [p in Product]: boolean };
    if (newSelected[product] !== undefined) {
      newSelected[product] = !newSelected[product];
      setSelectedProducts(newSelected);
    }
  };

  const onLetsGoClick = () => {
    if (location) {
      geocodeByPlaceId(location.place_id)
        .then((latLng) => {
          const lat = latLng.lat();
          const lng = latLng.lng();

          const productsString = Object.entries(selectedProducts)
            .filter(([_, selected]) => selected)
            .map(([product, _]) => product)
            .join(",");

          const request = {
            products: productsString,
            minSafetyRating: minRating,
            lat,
            lng,
          };

          findShops(request)
            .then((result) => console.warn(result.data))
            .catch((error) => console.error(`FindShops failed with error: ${error}`));
        })
        .catch((reason) => console.error(`Geocoding failed with status ${reason}`));
    } else {
      console.error("Location required");
    }
  };

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

        <SafetySlider minRating={minRating} setMinRating={setMinRating} />

        <LocationSearch location={location} setLocation={setLocation} />
      </div>

      <Button
        size="large"
        color="primary"
        variant="contained"
        onClick={onLetsGoClick}
        style={buttonStyle}
      >
        <Typography variant="h6">{"Let's go!"}</Typography>

        <ArrowIcon style={{ marginLeft: "16px" }} />
      </Button>
    </div>
  );
};

export default FilterShops;
