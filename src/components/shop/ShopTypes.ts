import React from "react";
import { DBShopData } from "../shopList/ShopListTypes";

export interface ShopData {
  name: string;
  id: string;
  photoReference: string | null;
  roadName: string | null;
}

export interface ShopProps {
  shopData: ShopData;
  selectedScreen: ShopSelectedScreen;
  setSelectedScreen: (value: ShopSelectedScreen) => void;
  onBackClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type ShopSelectedScreen = "default" | "safety" | "stock" | "reviews";

export interface ShopHeaderProps {
  shopData: ShopData;
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
  shopId: string;
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
