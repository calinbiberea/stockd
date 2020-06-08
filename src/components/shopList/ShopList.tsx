import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
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

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const contentContainerStyle = {
  width: "100%",
  height: "90%",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  overflow: "auto",
};

const sectionContainerStyle = {
  display: "inline-block",
  width: "100%",
  textAlign: "center" as const,
};

const gridContainerStyle = {
  alignItems: "center",
  overflow: "auto",
  padding: "12px",
  height: "100%",
  margin: 0,
  width: "100%",
};

const ShopList: React.FC<ShopListProps> = ({ onBackClick, filters, location }: ShopListProps) => {
  const [shopList, setShopList] = useState<DBShopData[] | undefined>(undefined);
  const [currentLocationData, setCurrentLocationData] = useState<LocationData | null>(null);
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

  const shopListItems = shopList.map((shop) => (
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
    <div style={containerStyle}>
      <Header title="Shop List" onBackClick={onBackClick} />

      <div style={contentContainerStyle}>
        <div style={sectionContainerStyle}>
          <Card
            style={{ margin: "20px", display: "inline-block", padding: "10px" }}
            variant={"outlined"}
          >
            <Typography variant="h5" color="primary">
              {shopListItems.length !== 0
                ? "Here are the shops that we found:"
                : "We couldn't find any shops matching those filters."}
            </Typography>
          </Card>
        </div>

        <Overlay
          placeId={currentLocationData?.id || ""}
          closeOverlay={closeOverlay}
          locationData={currentLocationData}
        />

        <Grid container direction="column" spacing={3} wrap="nowrap" style={gridContainerStyle}>
          {shopListItems}
        </Grid>
      </div>
    </div>
  );
};

export default ShopList;
