export interface ShopProps {
  shopData: ShopData;
}

export type ShopSelectedScreen = "default" | "safety" | "stock" | "reviews";

export interface ShopHeaderProps {
  name: string;
  id: string;
  selectedScreen: ShopSelectedScreen;
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
