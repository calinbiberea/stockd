import React from "react";

export interface ShopProps {
  shopData: ShopData;
}

export type ShopSelectedScreen = "default" | "safety" | "stock" | "reviews";

export interface ShopHeaderProps {
  name: string;
  id: string;
  onBackClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ShopStockProps {
  shopId: string;
}

export interface ShopData {
  name: string;
  id: string;
}

export interface StockItemProps {
  icon: string;
  name: string;
  stock: number;
}
