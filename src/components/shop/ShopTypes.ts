import React from "react";
import { ShopData } from "../../util/googleMaps";

export interface ShopProps {
  shopData: ShopData;
}

export type ShopSelectedScreen = "default" | "safety" | "stock" | "reviews";

export interface ShopHeaderProps {
  shopData: ShopData;
  onBackClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ShopStockProps {
  shopId: string;
}

export interface StockItemProps {
  icon: string;
  name: string;
  stock: number;
  canUpdate: boolean;
  onUpdateClick: () => void;
}
