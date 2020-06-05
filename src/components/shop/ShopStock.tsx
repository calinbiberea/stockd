import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import StockItem from "./StockItem";
import updateStock from "../../util/firebaseOps";
import { ShopStockProps } from "./ShopTypes";
import { useSnackbar } from "notistack";

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

const buttonContainerStyle = {
  marginBottom: "8px",
  display: "inline-block",
};

const getMarks = (value: number) => [
  {
    value: 0,
    label: value === 0 ? <b>few</b> : <>few</>,
  },
  {
    value: 50,
    label: value === 50 ? <b>some</b> : <>some</>,
  },
  {
    value: 100,
    label: value === 100 ? <b>lots</b> : <>lots</>,
  },
];

const getSubmitSuffix = (numUpdates: number) =>
  numUpdates === 0 ? undefined : `${numUpdates} update${numUpdates === 1 ? "" : "s"}`;

const ShopStock: React.FC<ShopStockProps> = ({ stocks, locationData }: ShopStockProps) => {
  const [localStocks, setLocalStocks] = useState<Record<string, number>>({});
  const numUpdates = Object.keys(localStocks).length;
  const { enqueueSnackbar } = useSnackbar();

  const stocksAndSliders = Object.entries(stocks).map(([name, { icon, stock }]) => {
    const currentValue = localStocks[name];
    const updated = currentValue !== undefined;
    return (
      <Grid item key={name} style={gridItemStyle}>
        <div style={stockItemStyle}>
          <StockItem icon={icon} name={name} stock={stock} />
        </div>

        <Slider
          color={updated ? "primary" : "secondary"}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={getMarks(currentValue)}
          style={sliderStyle}
          value={updated ? currentValue : 50}
          onChange={(event, value) => {
            if (typeof value === "number") {
              setLocalStocks((prevState) => ({ ...prevState, [name]: value }));
            } else {
              console.error("Undefined value type in Slider onChange");
            }
          }}
        />
      </Grid>
    );
  });

  return (
    <div style={containerStyle}>
      <Grid container wrap="nowrap" style={gridContainerStyle}>
        {stocksAndSliders}
      </Grid>

      <div style={buttonContainerStyle}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // noinspection JSIgnoredPromiseFromCall
            updateStock(locationData, localStocks, enqueueSnackbar);
            setLocalStocks({});
          }}
          disabled={numUpdates === 0}
        >
          Submit {getSubmitSuffix(numUpdates)}
        </Button>
        &nbsp;&nbsp;
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => setLocalStocks({})}
          disabled={numUpdates === 0}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ShopStock;
