// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import StockItem from "./StockItem";
import breadIcon from "../../res/icons/bread.svg";
import updateStock from "../../util/firebaseOps";
import { ShopStockProps } from "./ShopTypes";
import { db } from "../../firebase/firebaseApp";

const containerStyle = {
  flex: 4,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
};

const stocksContainerStyle = {
  width: "100%",
  display: "flex",
  flex: 1,
  flexDirection: "column" as const,
};

const stockItemSliderStyle = {
  display: "flex",
  flex: 1,
  width: "100%",
  flexDirection: "row" as const,
  alignItems: "center",
  justifyContent: "space-around",
};

const sliderStyle = {
  width: "200px",
};

const buttonStyle = {
  width: "20%",
  marginBottom: "8px",
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

  useEffect(() => {
    return db
      .collection("shops")
      .doc(shopId)
      .onSnapshot(
        (shopSnapshot) => {
          const data = shopSnapshot.get("breadStock");
          setBreadStock(data);
          console.warn({ data });
        },
        (err) => {
          console.error(`Encountered error: ${err}`);
        }
      );
  }, [shopId]);

  return (
    <div style={containerStyle}>
      <div style={stocksContainerStyle}>
        <div style={stockItemSliderStyle}>
          <StockItem
            icon={breadIcon}
            name="Bread"
            stock={breadStock}
            canUpdate={false}
            onUpdateClick={() => {
              /**/
            }}
          />
          <Slider
            aria-labelledby="discrete-slider-restrict"
            step={null}
            marks={marks}
            style={sliderStyle}
            value={newBreadStock}
            onChange={(event, value) => {
              /* TODO: ugly, fix, please */

              if (typeof value === "number") {
                setNewBreadStock(value);
              } else {
                console.error("Undefined value type in Slider onChange");
              }
            }}
          />
        </div>
      </div>

      <Button variant="contained" color="primary" style={buttonStyle} onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ShopStock;
