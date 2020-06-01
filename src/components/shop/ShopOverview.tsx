import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import StockItem from "./StockItem";
import breadIcon from "../../res/icons/bread.svg";
import eggsIcon from "../../res/icons/eggs.svg";
import milkIcon from "../../res/icons/milk.svg";
import pastaIcon from "../../res/icons/pasta.svg";
import { FloatingActionButton } from "./floatingActionButton/FloatingActionButton";
import { ShopOverviewProps } from "./ShopTypes";

const containerStyle = {
  flex: 4,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-around",
  alignItems: "center",
  padding: "12px",
};

const gridItemStyle = {
  width: "50%",
};

const stocks: { icon: string; name: string; stock: number }[] = [
  {
    icon: breadIcon,
    name: "Bread",
    stock: 2,
  },
  {
    icon: eggsIcon,
    name: "Eggs",
    stock: 2,
  },
  {
    icon: milkIcon,
    name: "Milk",
    stock: 2,
  },
  {
    icon: pastaIcon,
    name: "Pasta",
    stock: 2,
  },
];

const ShopOverview: React.FC<ShopOverviewProps> = ({ onUpdateClicked }: ShopOverviewProps) => {
  const [updateClicked, setUpdateClicked] = useState(false);

  const onFABClick = () => setUpdateClicked((prevUpdateClicked) => !prevUpdateClicked);

  const stockItems = stocks.map(({ icon, name, stock }) => (
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
      <Grid container spacing={3}>
        {stockItems}
      </Grid>

      <FloatingActionButton onClick={onFABClick} />
    </div>
  );
};

export default ShopOverview;
