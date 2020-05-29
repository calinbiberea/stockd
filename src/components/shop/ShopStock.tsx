import React, { ChangeEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import StockItem from "./StockItem";
import breadIcon from "../../res/icons/bread.svg";
import updateStock from "../../util/firebaseOps";
import { ShopStockProps } from "./ShopTypes";
import { db } from "../../firebase/firebaseApp";

const containerStyle = {
  width: "100%",
  height: "80%",
  display: "flex",
};

const stocksContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
};

const stockItemSliderStyle = {
  flex: 1,
  width: "100%",
  flexDirection: "row" as const,
};

const marks = [
  {
    value: 0,
    label: "low",
  },
  {
    value: 50,
    label: "average",
  },
  {
    value: 100,
    label: "high",
  },
];

const ShopStock: React.FC<ShopStockProps> = ({ shopId }: ShopStockProps) => {
  const [breadStock, setBreadStock] = useState(50);
  const [newBreadStock, setNewBreadStock] = useState(50);

  const onSubmit = () => {
    updateStock(shopId, "bread", newBreadStock);
  };

  const shopDBData = db.collection("shops").doc(shopId);

  const databaseListener = shopDBData.onSnapshot(
    (shopSnapshot) => {
      const data = shopSnapshot.get("breadStock");
      setBreadStock(data);
      // eslint-disable-next-line no-console
      console.log({ data });
    },
    (err) => {
      // eslint-disable-next-line no-console,no-template-curly-in-string
      console.log("Encountered error: ${err}");
    }
  );

  /* firebase listener for any changes the current id. */

  return (
    <div style={containerStyle}>
      <div style={stocksContainerStyle}>
        <div style={stockItemSliderStyle}>
          <StockItem icon={breadIcon} name="Bread" stock={breadStock} />

          <Slider
            value={newBreadStock}
            onChange={(event, value) => {
              /* TODO: ugly, fix, please */

              if (typeof value === "number") {
                setNewBreadStock(value);
              } else {
                console.error("Undefined value type in Slider onChange");
              }
            }}
            aria-labelledby="discrete-slider-restrict"
            step={null}
            marks={marks}
          />
        </div>
      </div>

      <Button variant="contained" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ShopStock;
