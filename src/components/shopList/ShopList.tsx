import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShopListItem from "./ShopListItem";
import Header from "../header/Header";
import { DBShopData, FindShopsResult, ShopListProps } from "./ShopListTypes";
import { geocodeByPlaceId } from "../../util/googleMaps";
import { findShops } from "../../firebase/firebaseApp";

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

  useEffect(() => {
    const getUserLocation = async () => {
      if (location.geolocated) {
        return { lat: location.lat, lng: location.lng };
      }
      const placeLocation = await geocodeByPlaceId(location.placeId);
      return { lat: placeLocation.lat(), lng: placeLocation.lng() };
    };

    const getData = async () => {
      // eslint-disable-next-line no-console
      console.log("Getting location...");
      const userLocation = await getUserLocation();
      // eslint-disable-next-line no-console
      console.log("got");

      const request = {
        products: filters.products.join(","),
        minSafetyRating: 2 * filters.minSafetyScore,
        lat: userLocation.lat,
        lng: userLocation.lng,
      };

      // eslint-disable-next-line no-console
      console.log("Sending data request...");

      const result = (await findShops(request)) as FindShopsResult;

      // eslint-disable-next-line no-console
      console.log("got.");
      // eslint-disable-next-line no-console
      console.log(result);

      setShopList(result.data);
    };

    getData();
  }, [filters, location]);

  if (shopList === undefined) {
    return (
      <Box
        style={{
          position: "absolute",
          left: "50vw",
          top: "50vh",
          transform: "tranlate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const shopListItems = shopList.map((shop) => (
    <Grid item key={shop.id}>
      <ShopListItem shopData={shop} startTime={"9:00"} endTime={"21:00"} />
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
              Here are the shops that we found:
            </Typography>
          </Card>
        </div>

        <Grid container direction="column" spacing={3} wrap="nowrap" style={gridContainerStyle}>
          {shopListItems}
        </Grid>
      </div>
    </div>
  );
};

export default ShopList;
