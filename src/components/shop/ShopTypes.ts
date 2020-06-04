import React from "react";
import { LocationData } from "../../util/googleMaps";
import { DBShopData } from "../shopList/ShopListTypes";

export interface ShopProps {
  locationData: LocationData;
  selectedScreen: ShopSelectedScreen;
  setSelectedScreen: (value: ShopSelectedScreen) => void;
  onBackClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type ShopSelectedScreen = "default" | "safety" | "stock" | "reviews";

export interface ShopHeaderProps {
  locationData: LocationData;
  onBackClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface Stocks {
  [name: string]: {
    icon: string;
    stock: number;
  };
}

export interface ShopOverviewProps {
  stocks: Stocks;
  onUpdateClicked: () => void;
}

export interface ShopStockProps {
  stocks: Stocks;
  locationData: LocationData;
}

export interface StockItemProps {
  icon: string;
  name: string;
  stock: number;
  canUpdate: boolean;
  onUpdateClick: () => void;
}

export interface ShopListItemProps {
  shopData: DBShopData;
  startTime: string;
  endTime: string;
}
