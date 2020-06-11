import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Fade, makeStyles, createStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import Overlay from "../overlay/Overlay";
import { SortBy, DBShopData, FindShopsResult, ShopResultsProps, View } from "./ShopResultsTypes";
import { geocodeByPlaceId, LocationData } from "../../util/googleMaps";
import { findShops } from "../../firebase/firebaseApp";
import ShopList from "./ShopList";
import ShopMap from "./ShopMap";
import ShopResultsHeader from "./ShopResultsHeader";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
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
  const [view, setView] = useState<View>("list");
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

      if (filters.editShop) {
        // eslint-disable-next-line no-console
        console.log("Calling places to retrieve shop information.");
        return;
      }

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

  return (
    <div className={classes.container}>
      <ShopResultsHeader
        onBackClick={onBackClick}
        view={view}
        setView={setView}
        setSortBy={setSortBy}
      />
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
    </div>
  );
};

export default ShopResults;
