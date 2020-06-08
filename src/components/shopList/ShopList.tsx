import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import ShopListItem from "./ShopListItem";
import Header from "../header/Header";
import Overlay from "../overlay/Overlay";
import { DBShopData, FindShopsResult, ShopListProps } from "./ShopListTypes";
import { geocodeByPlaceId, LocationData } from "../../util/googleMaps";
import { findShops } from "../../firebase/firebaseApp";

type SortBy = "distance" | "safetyRating";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
    },
    sortContainer: {
      minWidth: "150px",
      marginLeft: "auto",
      backgroundColor: "#FFF",
    },
    contentContainer: {
      width: "100%",
      height: "93%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      margin: "30px",
    },
    gridContainer: {
      height: "100%",
      width: "100%",
      alignItems: "center",
      overflow: "auto",
    },
    gridItem: {
      margin: "16px 0",
    },
    circularProgressContainer: {
      position: "absolute",
      left: "50vw",
      top: "50vh",
      transform: "translate(-50%, -50%)",
    },
  })
);

const compareByDistance = (a: DBShopData, b: DBShopData) => a.distance - b.distance;

const compareBySafetyRating = (a: DBShopData, b: DBShopData) => {
  const ratingA = ((a.displayed as Record<string, unknown>)?.safetyScore || 0) as number;
  const ratingB = ((b.displayed as Record<string, unknown>)?.safetyScore || 0) as number;

  return ratingB - ratingA;
};

const ShopList: React.FC<ShopListProps> = ({ onBackClick, filters, location }: ShopListProps) => {
  const [shopList, setShopList] = useState<DBShopData[] | undefined>(undefined);
  const [currentLocationData, setCurrentLocationData] = useState<LocationData | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("distance");

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getUserLocation = async () => {
      if (location.geolocated) {
        return { lat: location.lat, lng: location.lng };
      }

      const placeLocation = await geocodeByPlaceId(location.placeId);
      return { lat: placeLocation.lat(), lng: placeLocation.lng() };
    };

    const getData = async () => {
      const userLocation = await getUserLocation();
      const request = {
        products: filters.products.join(","),
        safetyFeatures: filters.safetyFeatures.join(","),
        lat: userLocation.lat,
        lng: userLocation.lng,
        radius: filters.maxDistance,
      };
      const response = ((await findShops(request)).data as unknown) as FindShopsResult;

      if (!response.success) {
        enqueueSnackbar("Failed to retrieve results", { variant: "error" });
        onBackClick();
        return;
      }

      if (response.results.length === 0) {
        enqueueSnackbar("We couldn't find any shops matching those filters.", {
          variant: "warning",
        });
        onBackClick();
        return;
      }

      setShopList(response.results);
    };

    // noinspection JSIgnoredPromiseFromCall
    getData();
  }, [enqueueSnackbar, filters, location, onBackClick]);

  if (shopList === undefined) {
    return (
      <Box className={classes.circularProgressContainer}>
        <CircularProgress />
      </Box>
    );
  }

  const closeOverlay = () => setCurrentLocationData(null);
  const onGetDetailsClick = (locationData: LocationData) => setCurrentLocationData(locationData);

  let compareFunc: (a: DBShopData, b: DBShopData) => number;
  switch (sortBy) {
    case "distance":
      compareFunc = compareByDistance;
      break;
    case "safetyRating":
      compareFunc = compareBySafetyRating;
      break;
  }

  const shopListItems = shopList
    .slice()
    .sort(compareFunc)
    .map((shop) => (
      <Grid item key={shop.id} className={classes.gridItem}>
        <ShopListItem
          shopData={shop}
          startTime={"9:00"}
          endTime={"21:00"}
          onGetDetailsClick={onGetDetailsClick}
        />
      </Grid>
    ));

  return (
    <div className={classes.container}>
      <Header onBackClick={onBackClick}>
        <FormControl variant="filled" className={classes.sortContainer}>
          <InputLabel>Sort by</InputLabel>

          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
            <MenuItem value={"distance"}>Distance</MenuItem>

            <MenuItem value={"safetyRating"}>Safety Rating</MenuItem>
          </Select>
        </FormControl>
      </Header>

      <div className={classes.contentContainer}>
        <Typography variant="h5" color="primary" className={classes.title}>
          {shopListItems.length !== 0
            ? "Here are the shops that we found"
            : "We couldn't find any shops matching those filters."}
        </Typography>

        <Overlay
          placeId={currentLocationData?.id || ""}
          closeOverlay={closeOverlay}
          locationData={currentLocationData}
        />

        <Grid container direction="column" wrap="nowrap" className={classes.gridContainer}>
          {shopListItems}
        </Grid>
      </div>
    </div>
  );
};

export default ShopList;
