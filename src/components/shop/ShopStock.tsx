import React, { useState } from "react";
import {
  Button,
  Slider,
  Grid,
  Divider,
  useMediaQuery,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import StockItem from "./StockItem";
import updateStock from "../../util/firebaseOps";
import { ShopStockProps } from "./ShopTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    gridContainer: {
      overflow: "auto",
    },
    gridItem: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
    },
    stockItem: {
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
    },
    gridDivider: {
      width: "80%",
      height: "2px",
      margin: "4px 0",
    },
    slider: {
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
      [theme.breakpoints.up("md")]: {
        width: "30%",
      },
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
    },
    buttonDivider: {
      width: "16px",
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

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();

  const numUpdates = Object.keys(localStocks).length;
  const numStocks = Object.keys(stocks).length;

  const { enqueueSnackbar } = useSnackbar();

  const stocksAndSliders = Object.entries(stocks).map(([name, { icon, stock }], ix) => {
    const currentValue = localStocks[name];
    const updated = currentValue !== undefined;
    const last = ix === numStocks - 1;

    return (
      <Grid item xs={12} key={name} className={classes.gridItem}>
        <div className={classes.stockItem}>
          <StockItem icon={icon} name={name} stock={stock} />
        </div>

        <Slider
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={getMarks(currentValue)}
          color={updated ? "primary" : "secondary"}
          className={classes.slider}
          value={updated ? currentValue : 50}
          onChange={(event, value) => {
            setLocalStocks((prevState) => ({ ...prevState, [name]: value as number }));
          }}
        />

        {smallScreen && !last ? (
          <Divider variant="middle" orientation="horizontal" className={classes.gridDivider} />
        ) : undefined}
      </Grid>
    );
  });

  return (
    <div className={classes.container}>
      <Grid container className={classes.gridContainer}>
        {stocksAndSliders}
      </Grid>

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          disabled={numUpdates === 0}
          onClick={() => {
            // noinspection JSIgnoredPromiseFromCall
            updateStock(locationData, localStocks, enqueueSnackbar);
            setLocalStocks({});
          }}
        >
          Submit {getSubmitSuffix(numUpdates)}
        </Button>

        <div className={classes.buttonDivider} />

        <Button
          variant="contained"
          color="secondary"
          disabled={numUpdates === 0}
          onClick={() => setLocalStocks({})}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ShopStock;
