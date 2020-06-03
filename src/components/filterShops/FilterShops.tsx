import React, { useState } from "react";
import { Button, Card, Typography } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import { FilterShopsProps, Product, products, SafetyRating } from "./FilterShopsTypes";
import SafetySlider from "./SafetySlider";
import ProductSelector from "./ProductSelector";
import Header from "../header/Header";
import LocationSearch from "./LocationSearch";

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

const FilterShops: React.FC<FilterShopsProps> = ({ onBack }: FilterShopsProps) => {
  const [selectedProducts, setSelectedProducts] = useState(defaultSelectedProducts);
  const [minRating, setMinRating] = useState<SafetyRating>(0);

  const toggleProduct = (product: Product) => {
    const newSelected = Object.assign({}, selectedProducts) as { [p in Product]: boolean };
    if (newSelected[product] !== undefined) {
      newSelected[product] = !newSelected[product];
      setSelectedProducts(newSelected);
    }
  };

  return (
    <div style={containerStyle}>
      <Header title="Stockd" onBackClick={onBack} />

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

        <LocationSearch />
      </div>

      <Button
        size="large"
        color="primary"
        variant="contained"
        onClick={() => console.warn("eh")}
        style={buttonStyle}
      >
        <Typography variant="h6">{"Let's go!"}</Typography>

        <ArrowIcon style={{ marginLeft: "16px" }} />
      </Button>
    </div>
  );
};

export default FilterShops;
