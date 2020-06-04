import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ShopListItem from "./ShopListItem";
import Header from "../header/Header";
import { LocationData } from "../../util/googleMaps";
import { ShopListProps } from "./ShopListTypes";

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

const defaultLocationData: LocationData = {
  name: "Flex Store",
  id: "nr 1 mondial",
  photo: null,
  road: "Swag boulevard",
};

const shops: { locationData: LocationData; startTime: string; endTime: string }[] = [
  {
    locationData: defaultLocationData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    locationData: defaultLocationData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    locationData: defaultLocationData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    locationData: defaultLocationData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    locationData: defaultLocationData,
    startTime: "09:00",
    endTime: "21:00",
  },
  {
    locationData: defaultLocationData,
    startTime: "09:00",
    endTime: "21:00",
  },
];

const ShopList: React.FC<ShopListProps> = ({ setRoute }: ShopListProps) => {
  const shopListItems = shops.map(({ locationData, startTime, endTime }) => (
    <Grid item key={locationData.name + locationData.road}>
      <ShopListItem locationData={locationData} startTime={startTime} endTime={endTime} />
    </Grid>
  ));

  return (
    <div style={containerStyle}>
      <Header title="Shop List" onBackClick={() => setRoute("filterShops")} />

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
