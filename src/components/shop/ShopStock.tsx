import React from "react";
import StockItem from "./StockItem";
import Slider from "@material-ui/core/Slider";
import breadIcon from "../../res/icons/bread.svg";

const containerStyle = {
  width: "100%",
  height: "80%",
  display: "flex",
};

const stocksContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
};

const stockItemSliderStyle = {
  flex: 1,
  width: "100%",
  flexDirection: "row" as const,
};

const marks = [
  {
    value: 0,
    label: "low",
  },
  {
    value: 50,
    label: "average",
  },
  {
    value: 100,
    label: "high",
  },
];

const ShopStock: React.FC = () => (
  <div style={containerStyle}>
    <div style={stocksContainerStyle}>
      <div style={stockItemSliderStyle}>
        <StockItem icon={breadIcon} name="Bread" stock={2} />

        <Slider
          defaultValue={50}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={marks}
        />
      </div>
    </div>
  </div>
);

export default ShopStock;
