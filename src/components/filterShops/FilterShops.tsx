import React, { useState } from "react";
import { Button, Card, Typography } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import colors from "../../res/colors";
import { Product, products, SafetyRating } from "./FilterShopsTypes";
import SafetySlider from "./SafetySlider";
import ProductSelector from "./ProductSelector";

const containerStyle = {
  position: "absolute" as const,
  width: "100vw",
  height: "100vh",
  backgroundColor: "white",
  overflow: "auto",
};

const sectionContainerStyle = {
  display: "inline-block",
  width: "100%",
  textAlign: "center" as const,
};

const defaultSelectedProducts = Object.fromEntries(products.map((product) => [product, false])) as {
  [p in Product]: boolean;
};

const FilterShops: React.FC = () => {
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
      <div style={sectionContainerStyle}>
        <Card
          style={{ margin: "20px", display: "inline-block", padding: "20px" }}
          variant={"outlined"}
        >
          <Typography variant="h4" color="primary">
            What are you looking for?
          </Typography>
        </Card>
      </div>

      <div style={{ margin: "0 20px" }}>
        <ProductSelector
          selected={selectedProducts}
          onSelect={toggleProduct}
          onReset={() => setSelectedProducts(defaultSelectedProducts)}
        />
        <SafetySlider minRating={minRating} setMinRating={setMinRating} />
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          size="large"
          color="primary"
          variant="contained"
          style={{ textTransform: "none", fontSize: "large" }}
        >
          {"Let's go!"}
          <ArrowIcon style={{ marginLeft: "15px" }} />
        </Button>
      </div>
    </div>
  );
};

export default FilterShops;
