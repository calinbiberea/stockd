import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import StockItem from "./StockItem";
import { FloatingActionButton } from "../floatingActionButton/FloatingActionButton";
import { ShopOverviewProps } from "./ShopTypes";

const containerStyle = {
  flex: 4,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-around",
  alignItems: "center",
  padding: "12px",
  overflow: "auto",
};

const gridContainerStyle = {
  flex: 1,
  flexDirection: "row" as const,
  overflow: "auto",
};

const gridItemStyle = {
  width: "50%",
};

const ShopOverview: React.FC<ShopOverviewProps> = ({
  stocks,
  onUpdateClicked,
}: ShopOverviewProps) => {
  const [updateClicked, setUpdateClicked] = useState(false);

  const onFABClick = () => setUpdateClicked((prevUpdateClicked) => !prevUpdateClicked);

  const stockItems = Object.entries(stocks).map(([name, { icon, stock }]) => (
    <Grid item key={name} style={gridItemStyle}>
      <StockItem
        icon={icon}
        name={name}
        stock={stock}
        canUpdate={updateClicked}
        onUpdateClick={onUpdateClicked}
      />
    </Grid>
  ));

  return (
    <div style={containerStyle}>
      <Grid container style={gridContainerStyle}>
        {stockItems}
      </Grid>

      <FloatingActionButton onClick={onFABClick} />
    </div>
  );
};

export default ShopOverview;
