import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NewHeader from "../landing/NewHeader";
import ShopListItem from "./ShopListItem";
import { ShopData } from "../../util/googleMaps";

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
};

const subtitleStyle = {
  marginBottom: "16px",
};

const gridContainerStyle = {
  alignItems: "center",
  overflow: "auto",
  padding: "12px",
};

const defaultShopData: ShopData = {
  name: "Flex Store",
  id: "nr 1 mondial",
  photoReference: null,
  roadName: "Swag boulevard",
};

const shops: { shopData: ShopData; startTime: string; endTime: string }[] = [
  {
    shopData: defaultShopData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    shopData: defaultShopData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    shopData: defaultShopData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    shopData: defaultShopData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    shopData: defaultShopData,
    startTime: "09:00",
    endTime: "21:00",
  },
];

const ShopList: React.FC = () => {
  const shopListItems = shops.map(({ shopData, startTime, endTime }) => (
    <Grid item key={shopData.name + shopData.roadName}>
      <ShopListItem shopData={shopData} startTime={startTime} endTime={endTime} />
    </Grid>
  ));

  return (
    <div style={containerStyle}>
      <NewHeader title="Shop List" onBackClick={() => console.error("fix Route import :)")} />

      <div style={contentContainerStyle}>
        <Typography variant="h6" style={subtitleStyle}>
          Here are the shops we found
        </Typography>

        <Grid container direction="column" spacing={3} wrap="nowrap" style={gridContainerStyle}>
          {shopListItems}
        </Grid>
      </div>
    </div>
  );
};

export default ShopList;
