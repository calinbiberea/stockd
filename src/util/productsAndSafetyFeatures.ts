import breadIcon from "../res/icons/bread.svg";
import eggsIcon from "../res/icons/eggs.svg";
import milkIcon from "../res/icons/milk.svg";
import pastaIcon from "../res/icons/pasta.svg";
import medicineIcon from "../res/icons/medicineIcon.svg";
import toiletPaperIcon from "../res/icons/toiletPaperIcon.svg";

// <editor-fold desc="Products">

export interface Product {
  name: string;
  icon: string;
}

export const products = {
  bread: {
    name: "Bread",
    icon: breadIcon,
  },
  eggs: {
    name: "Eggs",
    icon: eggsIcon,
  },
  milk: {
    name: "Milk",
    icon: milkIcon,
  },
  pasta: {
    name: "Pasta",
    icon: pastaIcon,
  },
  medicine: {
    name: "Medicine",
    icon: medicineIcon,
  },
  toiletpaper: {
    name: "Toilet Paper",
    icon: toiletPaperIcon,
  },
} as const;

export type ProductId = keyof typeof products;

export const getProduct = (key: string): Product =>
  products[key as ProductId] || { name: key, icon: breadIcon };

// </editor-fold>

// <editor-fold desc="Safety Features">

// Same shape as Product
export type SafetyFeature = Product;

export const safetyFeatures = {
  masks: {
    name: "Masks",
    icon: "",
  },
  gloves: {
    name: "Gloves",
    icon: "",
  },
  socialdistancing: {
    name: "Social Distancing",
    icon: "",
  },
} as const;

export type SafetyFeatureId = keyof typeof safetyFeatures;

export const getSafetyFeature = (key: string): SafetyFeature =>
  safetyFeatures[key as SafetyFeatureId] || { name: key, icon: "" };

// </editor-fold>
