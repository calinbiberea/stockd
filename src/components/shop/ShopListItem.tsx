import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import ShopHeader from "./ShopHeader";
import { ShopListItemProps } from "./ShopTypes";

const shopCardStyle = {
  width: "30vw",
  height: "25vh",
  display: "flex",
  flexDirection: "column" as const,
};

const shopContentStyle = {
  flex: 4,
  width: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
};

const ShopListItem: React.FC<ShopListItemProps> = ({
  shopData,
  startTime,
  endTime,
}: ShopListItemProps) => (
  <Card style={shopCardStyle}>
    <ShopHeader shopData={shopData} onBackClick={() => console.error("eh")} />

    <div style={shopContentStyle}>
      <Typography>
        Opening times: {startTime} - {endTime}
      </Typography>
    </div>
  </Card>
);

export default ShopListItem;
