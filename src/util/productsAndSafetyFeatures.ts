import breadIcon from "../res/icons/stocks/bread.svg";
import eggsIcon from "../res/icons/stocks/eggs.svg";
import milkIcon from "../res/icons/stocks/milk.svg";
import pastaIcon from "../res/icons/stocks/pasta.svg";
import medicineIcon from "../res/icons/stocks/medicine.svg";
import toiletPaperIcon from "../res/icons/stocks/toiletPaper.svg";
import unknownIcon from "../res/icons/stockValues/unknown.png";
import fewIcon from "../res/icons/stockValues/few.png";
import someIcon from "../res/icons/stockValues/some.png";
import fullIcon from "../res/icons/stockValues/full.png";
import distancingIcon from "../res/icons/safety/distancing.png";
import glovesIcon from "../res/icons/safety/gloves.png";
import maskIcon from "../res/icons/safety/mask.png";

// <editor-fold desc="Products">

interface Product {
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

export const getIconByStockValue = (value: number | undefined): string => {
  if (value === undefined) {
    return unknownIcon;
  } else if (value === 0) {
    return fewIcon;
  } else if (value === 50) {
    return someIcon;
  } else if (value === 100) {
    return fullIcon;
  } else {
    console.error(`Unknown value ${value} in getIconByStockValue.`);
    return unknownIcon;
  }
};

// </editor-fold>

// <editor-fold desc="Safety Features">

interface SafetyFeature {
  name: string;
  icon: string;
}

export const safetyFeatures = {
  masks: {
    name: "Masks",
    icon: maskIcon,
  },
  gloves: {
    name: "Gloves",
    icon: glovesIcon,
  },
  socialdistancing: {
    name: "Social Distancing",
    icon: distancingIcon,
  },
} as const;

export type SafetyFeatureId = keyof typeof safetyFeatures;

export const getSafetyFeature = (key: string): SafetyFeature =>
  safetyFeatures[key as SafetyFeatureId] || { name: key, icon: distancingIcon };

// </editor-fold>
