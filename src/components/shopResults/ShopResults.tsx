import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  makeStyles,
  createStyles,
  Card,
  Divider,
  ButtonGroup,
  Button,
  Fade,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import SortByMenu from "./SortByMenu";
import Header from "../header/Header";
import Overlay from "../overlay/Overlay";
import { SortBy, DBShopData, FindShopsResult, ShopResultsProps } from "./ShopResultsTypes";
import { geocodeByPlaceId, LocationData } from "../../util/googleMaps";
import { findShops } from "../../firebase/firebaseApp";
import ShopList from "./ShopList";
import ShopMap from "./ShopMap";

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
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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

const ShopResults: React.FC<ShopResultsProps> = ({
  onBackClick,
  filters,
  location,
}: ShopResultsProps) => {
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

  return (
    <div className={classes.container}>
      {header}
      <Overlay
        placeId={currentLocationData?.id || ""}
        closeOverlay={closeOverlay}
        locationData={currentLocationData}
      />
      <Fade in={view === "list"}>
        <div>
          <ShopList shopList={shopList} sortBy={sortBy} onShopSelect={onGetDetailsClick} />
        </div>
      </Fade>
      <Fade in={view === "map"}>
        <div>
          <ShopMap shopList={shopList} onShopSelect={onGetDetailsClick} userPos={userPos} />
        </div>
      </Fade>
      {/*{content}*/}
    </div>
  );
};

export default ShopResults;
