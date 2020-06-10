import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  makeStyles,
  createStyles,
  Card,
  Divider,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import ShopListItem from "./ShopListItem";
import SortByMenu from "./SortByMenu";
import Header from "../header/Header";
import Overlay from "../overlay/Overlay";
import { SortBy, DBShopData, FindShopsResult, ShopListProps } from "./ShopListTypes";
import { geocodeByPlaceId, LocationData } from "../../util/googleMaps";
import { findShops } from "../../firebase/firebaseApp";
import Map from "../map/Map";
import { Marker, OverlayView } from "@react-google-maps/api";
import colors from "../../res/colors";
import ShopPinIcon from "../../res/shopPin.png";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
    },
    controlsContainer: {
      display: "flex",
      flexDirection: "row",
      padding: "0 10px",
      alignItems: "center",
      marginLeft: "auto",
    },
    controlsDivider: {
      margin: `0 ${theme.spacing(2)}px`,
    },
    sortByContainer: {
      minWidth: "96px",
      textAlign: "center",
    },
    sortByWrapper: {
      display: "inline-block",
    },
    sortBy: {
      marginLeft: "auto",
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

const CurrentPosition = (
  <div
    style={{
      zIndex: 2001,
      width: "16px",
      height: "16px",
      backgroundColor: colors.blue1,
      borderRadius: "100%",
      border: "2px solid white",
      boxSizing: "border-box",
      boxShadow: `0px 0px 24px 16px ${colors.blue3}`,
    }}
  />
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
  const [view, setView] = useState<"list" | "map">("list");
  const [userPos, setUserPos] = useState({ lat: 0, lng: 0 });

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
      setUserPos({ ...userLocation });
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

      if (!filters.nameFilter) {
        setShopList(response.results);
      } else {
        const lowerCaseShopName = filters.shopName.toLowerCase();
        const filterByName = (result: DBShopData, lowerCaseShopName: string) => {
          const splits = result.locationData.name.split(" ");
          let match = false;

          splits.forEach((split) => {
            match = match || split.toLowerCase().lastIndexOf(lowerCaseShopName, 0) === 0;
          });

          return match;
        };

        setShopList(response.results.filter((result) => filterByName(result, lowerCaseShopName)));
      }
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

  const markers = shopList.map((shop) => (
    <Marker
      key={shop.id}
      position={shop.location}
      onClick={() => onGetDetailsClick(shop.locationData)}
      icon={ShopPinIcon}
    />
  ));

  const header = (
    <Header onBackClick={onBackClick}>
      <Card className={classes.controlsContainer}>
        <Typography component="div">
          <ButtonGroup variant="contained" color="primary" size="small">
            <Button disabled={view === "list"} onClick={() => setView("list")}>
              List View
            </Button>
            <Button disabled={view === "map"} onClick={() => setView("map")}>
              Map View
            </Button>
          </ButtonGroup>
        </Typography>
        <Divider
          variant="fullWidth"
          orientation="vertical"
          flexItem
          className={classes.controlsDivider}
          style={{ margin: "0 10px" }}
        />
        <div className={classes.sortByContainer}>
          <div className={classes.sortByWrapper}>
            <SortByMenu setSortBy={setSortBy} className={classes.sortBy} />
          </div>
        </div>
      </Card>
    </Header>
  );

  let content;
  switch (view) {
    case "list":
      content = (
        <>
          <Typography variant="h5" color="primary" className={classes.title}>
            {shopListItems.length !== 0
              ? "Here are the shops that we found"
              : "We couldn't find any shops matching those filters."}
          </Typography>

          <Grid container direction="column" wrap="nowrap" className={classes.gridContainer}>
            {shopListItems}
          </Grid>
        </>
      );
      break;
    case "map":
      content = (
        <div style={{ width: "100%", height: "100%" }}>
          <Map currentCenter={userPos}>
            <OverlayView position={userPos} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              {CurrentPosition}
            </OverlayView>
            {markers}
          </Map>
        </div>
      );
      break;
  }

  return (
    <div className={classes.container}>
      {header}

      <div className={classes.contentContainer}>
        <Overlay
          placeId={currentLocationData?.id || ""}
          closeOverlay={closeOverlay}
          locationData={currentLocationData}
        />
        {content}
      </div>
    </div>
  );
};

export default ShopList;
