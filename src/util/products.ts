import breadIcon from "../res/icons/bread.svg";
import eggsIcon from "../res/icons/eggs.svg";
import milkIcon from "../res/icons/milk.svg";
import pastaIcon from "../res/icons/pasta.svg";
import medicineIcon from "../res/icons/medicineIcon.svg";
import toiletPaperIcon from "../res/icons/toiletPaperIcon.svg";

type Products = {
  [key: string]: Product;
};

interface Product {
  name: string;
  icon: string;
}

const products: Products = {
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
    name: "ToiletPaper",
    icon: toiletPaperIcon,
  },
};

export const getProduct = (key: string): Product => products[key] || { name: key, icon: breadIcon };
