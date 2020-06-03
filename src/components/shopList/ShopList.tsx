import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NewHeader from "../landing/NewHeader";
import ShopListItem from "./ShopListItem";
import { ShopData } from "../../util/googleMaps";
import { Card } from "@material-ui/core";

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
