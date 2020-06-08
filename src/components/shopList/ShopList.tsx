import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShopListItem from "./ShopListItem";
import Header from "../header/Header";
import { DBShopData, FindShopsResult, ShopListProps } from "./ShopListTypes";
import { geocodeByPlaceId, LocationData } from "../../util/googleMaps";
import { findShops } from "../../firebase/firebaseApp";
import Overlay from "../overlay/Overlay";
import { useSnackbar } from "notistack";
import {
  createStyles,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type SortBy = "distance" | "safetyRating";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
    },
    headerWrapper: {
      display: "inline-block",
    },
    header: {
      margin: "20px",
      padding: "10px",
      display: "flex",
      flexDirection: "row",
    },
    sortBySelect: {
      minWidth: 150,
    },
    sortByDivider: {
      margin: `0px ${theme.spacing(2)}px`,
    },
    contentContainer: {
      width: "100%",
      height: "90%",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      overflow: "auto",
    },
    sectionContainer: {
      display: "inline-block",
      width: "100%",
      textAlign: "center" as const,
    },
    gridContainerStyle: {
      alignItems: "center",
      overflow: "auto",
      padding: "12px",
      height: "100%",
      margin: 0,
      width: "100%",
    },
  })
);

const compareByDistance = (a: DBShopData, b: DBShopData) => a.distance - b.distance;

const compareBySafetyRating = (a: DBShopData, b: DBShopData) => {
  const ratingA = ((a.displayed as Record<string, unknown>)?.safetyScore || 0) as number;
  const ratingB = ((b.displayed as Record<string, unknown>)?.safetyScore || 0) as number;
  return ratingA - ratingB;
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
      <Box
        style={{
          position: "absolute",
          left: "50vw",
          top: "50vh",
          transform: "translate(-50%, -50%)",
        }}
      >
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
      <Grid item key={shop.id}>
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
      <Header onBackClick={onBackClick} />

      <div className={classes.contentContainer}>
        <div className={classes.sectionContainer}>
          <div className={classes.headerWrapper}>
            <div className={classes.header}>
              <FormControl className={classes.sortBySelect} color="primary">
                <InputLabel>Sort by</InputLabel>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
                  <MenuItem value={"distance"}>Distance</MenuItem>
                  <MenuItem value={"safetyRating"}>Safety Rating</MenuItem>
                </Select>
              </FormControl>
              <Divider className={classes.sortByDivider} orientation="vertical" flexItem />
              <Typography variant="h5" color="primary" style={{ margin: "auto 0" }}>
                {shopListItems.length !== 0
                  ? "Here are the shops that we found:"
                  : "We couldn't find any shops matching those filters."}
              </Typography>
            </div>
          </div>
        </div>

        <Overlay
          placeId={currentLocationData?.id || ""}
          closeOverlay={closeOverlay}
          locationData={currentLocationData}
        />

        <Grid
          container
          direction="column"
          spacing={3}
          wrap="nowrap"
          className={classes.gridContainerStyle}
        >
          {shopListItems}
        </Grid>
      </div>
    </div>
  );
};

export default ShopList;
