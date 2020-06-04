import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import StockItem from "./StockItem";
import updateStock from "../../util/firebaseOps";
import { ShopStockProps } from "./ShopTypes";

const containerStyle = {
  flex: 4,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  overflow: "auto",
};

const gridContainerStyle = {
  width: "100%",
  display: "flex",
  flex: 1,
  flexDirection: "column" as const,
  overflow: "auto",
};

const gridItemStyle = {
  width: "100%",
  display: "flex",
  flex: 1,
  flexDirection: "row" as const,
  alignItems: "center",
  justifyContent: "space-around",
};

const stockItemStyle = {
  width: "50%",
};

const sliderStyle = {
  width: "200px",
};

const buttonStyle = {
  width: "20%",
  marginBottom: "8px",
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

const ShopStock: React.FC<ShopStockProps> = ({ stocks, shopData }: ShopStockProps) => {
  const [localStocks, setLocalStocks] = useState({} as Record<string, number>);

  const onSubmit = () => {
    Object.entries(localStocks).forEach(([key, value]) => updateStock(shopData, key, value));
  };

  const stocksAndSliders = Object.entries(stocks).map(([name, { icon, stock }]) => (
    <Grid item key={name} style={gridItemStyle}>
      <div style={stockItemStyle}>
        <StockItem
          icon={icon}
          name={name}
          stock={stock}
          canUpdate={false}
          onUpdateClick={() => {
            /**/
          }}
        />
      </div>

      <Slider
        aria-labelledby="discrete-slider-restrict"
        step={null}
        marks={marks}
        style={sliderStyle}
        value={localStocks[name] | 0}
        onChange={(event, value) => {
          if (typeof value === "number") {
            setLocalStocks((prevState) => ({ ...prevState, [name]: value }));
          } else {
            console.error("Undefined value type in Slider onChange");
          }
        }}
      />
    </Grid>
  ));

  return (
    <div style={containerStyle}>
      <Grid container wrap="nowrap" style={gridContainerStyle}>
        {stocksAndSliders}
      </Grid>

      <Button variant="contained" color="primary" style={buttonStyle} onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ShopStock;
