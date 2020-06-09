import React, { useState } from "react";
import { Button, Slider, Grid, makeStyles, createStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import StockItem from "./StockItem";
import updateStock from "../../util/firebaseOps";
import { ShopStockProps } from "./ShopTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flex: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "auto",
    },
    gridContainer: {
      width: "100%",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      overflow: "auto",
    },
    gridItem: {
      width: "100%",
      display: "flex",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    stockItem: {
      width: "50%",
    },
    slider: {
      width: "200px",
    },
    buttonContainer: {
      marginBottom: "8px",
      display: "inline-block",
    },
  })
);

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

  const classes = useStyles();

  const numUpdates = Object.keys(localStocks).length;

  const { enqueueSnackbar } = useSnackbar();

  const stocksAndSliders = Object.entries(stocks).map(([name, { icon, stock }]) => {
    const currentValue = localStocks[name];
    const updated = currentValue !== undefined;
    return (
      <Grid item key={name} className={classes.gridItem}>
        <div className={classes.stockItem}>
          <StockItem icon={icon} name={name} stock={stock} />
        </div>

        <Slider
          color={updated ? "primary" : "secondary"}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={getMarks(currentValue)}
          className={classes.slider}
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
    <div className={classes.container}>
      <Grid container wrap="nowrap" className={classes.gridContainer}>
        {stocksAndSliders}
      </Grid>

      <div className={classes.buttonContainer}>
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
