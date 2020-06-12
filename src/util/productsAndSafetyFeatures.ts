import breadIcon from "../res/icons/stocks/bread.svg";
import eggsIcon from "../res/icons/stocks/eggs.svg";
import milkIcon from "../res/icons/stocks/milk.svg";
import pastaIcon from "../res/icons/stocks/pasta.svg";
import medicineIcon from "../res/icons/stocks/medicine.svg";
import toiletPaperIcon from "../res/icons/stocks/toiletPaper.svg";
import unknownStockIcon from "../res/icons/stockValues/unknown.png";
import fewStockIcon from "../res/icons/stockValues/few.png";
import someStockIcon from "../res/icons/stockValues/some.png";
import fullStockIcon from "../res/icons/stockValues/full.png";
import distancingUnknownIcon from "../res/icons/safety/distancingU.png";
import distancingNoIcon from "../res/icons/safety/distancingN.png";
import distancingYesIcon from "../res/icons/safety/distancingY.png";
import glovesUnknownIcon from "../res/icons/safety/glovesU.png";
import glovesNoIcon from "../res/icons/safety/glovesN.png";
import glovesYesIcon from "../res/icons/safety/glovesY.png";
import masksUnknownIcon from "../res/icons/safety/masksU.png";
import masksNoIcon from "../res/icons/safety/masksN.png";
import masksYesIcon from "../res/icons/safety/masksY.png";

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
    return unknownStockIcon;
  } else if (value === 0) {
    return fewStockIcon;
  } else if (value === 50) {
    return someStockIcon;
  } else if (value === 100) {
    return fullStockIcon;
  } else {
    console.error(`Unknown value ${value} in getIconByStockValue.`);
    return unknownStockIcon;
  }
};

// </editor-fold>

// <editor-fold desc="Safety Features">

export type SafetyFeature = Product;

export const safetyFeatures = {
  masks: { name: "Masks", icon: "" },
  gloves: { name: "Gloves", icon: "" },
  socialdistancing: { name: "Social Distancing", icon: "" },
} as const;

export type SafetyFeatureId = keyof typeof safetyFeatures;

export const getSafetyFeature = (key: string): SafetyFeature =>
  safetyFeatures[key as SafetyFeatureId] || { name: key, icon: "" };

export type SafetyEnabled = "yes" | "no" | "unknown";

export const SafetyIcons: Record<SafetyFeatureId, Record<SafetyEnabled, string>> = {
  masks: {
    yes: masksYesIcon,
    no: masksNoIcon,
    unknown: masksUnknownIcon,
  },
  gloves: {
    yes: glovesYesIcon,
    no: glovesNoIcon,
    unknown: glovesUnknownIcon,
  },
  socialdistancing: {
    yes: distancingYesIcon,
    no: distancingNoIcon,
    unknown: distancingUnknownIcon,
  },
};

// </editor-fold>
