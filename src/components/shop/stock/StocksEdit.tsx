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
import { updateStock } from "../../../firebase/firebaseApp";
import { ProductId, products } from "../../../util/productsAndSafetyFeatures";
import { EditResult, StocksEditProps, Stocks } from "../ShopTypes";
import StockItem from "./StockItem";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      overflow: "auto",
    },
    gridContainer: {
      overflow: "auto",
    },
    gridItem: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    stockItem: {
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
    },
    gridDivider: {
      width: "80%",
      height: "2px",
      margin: "4px 0",
    },
    slider: {
      [theme.breakpoints.up("md")]: {
        width: "30%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: "8px",
    },
    buttonDivider: {
      width: "16px",
    },
  })
);

const getMarks = (value: number | undefined) => [
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

const StocksEdit: React.FC<StocksEditProps> = ({ locationData, stocks }: StocksEditProps) => {
  const [localStocks, setLocalStocks] = useState<Stocks>({});

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();

  const numUpdates = Object.keys(localStocks).length;
  const numStocks = Object.keys(stocks).length;

  const { enqueueSnackbar } = useSnackbar();

  const stocksAndSliders = Object.entries(products).map(([productId, { name, icon }], ix) => {
    const currentValue = localStocks[productId as ProductId];
    const updated = currentValue !== undefined;
    const last = ix === numStocks - 1;

    const onSliderChange = (_: React.ChangeEvent<unknown>, newValue: number | number[]) =>
      setLocalStocks((prevState) => ({ ...prevState, [productId]: newValue as number }));

    return (
      <Grid item xs={12} key={name} className={classes.gridItem}>
        <div className={classes.stockItem}>
          <StockItem icon={icon} name={name} value={stocks[productId as ProductId]} />
        </div>

        <Slider
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={getMarks(currentValue)}
          color={updated ? "primary" : "secondary"}
          className={classes.slider}
          value={updated ? currentValue : 50}
          onChange={onSliderChange}
        />

        {smallScreen && !last ? (
          <Divider variant="middle" orientation="horizontal" className={classes.gridDivider} />
        ) : undefined}
      </Grid>
    );
  });

  const onClearClick = () => setLocalStocks({});

  const onSubmitClick = async () => {
    const data = {
      shopId: locationData.id,
      scores: localStocks,
      updateLocationData: locationData.updateLocationData,
    };

    const response = ((await updateStock(data)).data as unknown) as EditResult;

    if (response.success) {
      enqueueSnackbar("Successfully updated stock information.", { variant: "success" });
    } else {
      enqueueSnackbar(`Failed to update. Reason: ${response.reason}`, { variant: "error" });
    }

    onClearClick();
  };

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
          onClick={onSubmitClick}
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

export default StocksEdit;
