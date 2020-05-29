import React, { useState } from "react";
import StockItem from "./StockItem";
import breadIcon from "../../res/icons/bread.svg";
import eggsIcon from "../../res/icons/eggs.svg";
import milkIcon from "../../res/icons/milk.svg";
import pastaIcon from "../../res/icons/pasta.svg";
import { FloatingActionButton } from "./floatingActionButton/FloatingActionButton";

const containerStyle = {
  flex: 4,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-around",
  alignItems: "center",
};

const stockOverviewStyle = {
  display: "flex",
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  justifyContent: "space-around",
  alignItems: "center",
};

export interface ShopOverviewProps {
  onUpdateClicked: () => void;
}

const ShopOverview: React.FC<ShopOverviewProps> = ({ onUpdateClicked }: ShopOverviewProps) => {
  const [updateClicked, setUpdateClicked] = useState(false);

  const onFABClick = () => {
    setUpdateClicked(!updateClicked);
  };

  return (
    <div style={containerStyle}>
      <div style={stockOverviewStyle}>
        <StockItem
          icon={breadIcon}
          name="Bread"
          stock={2}
          canUpdate={updateClicked}
          onUpdateClick={onUpdateClicked}
        />
        <StockItem
          icon={eggsIcon}
          name="Eggs"
          stock={2}
          canUpdate={false}
          onUpdateClick={onUpdateClicked}
        />
        <StockItem
          icon={milkIcon}
          name="Milk"
          stock={2}
          canUpdate={false}
          onUpdateClick={onUpdateClicked}
        />
        <StockItem
          icon={pastaIcon}
          name="Pasta"
          stock={2}
          canUpdate={false}
          onUpdateClick={onUpdateClicked}
        />
      </div>
      <FloatingActionButton onClick={onFABClick} />
    </div>
  );
};

export default ShopOverview;
