import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ShopHeader from "../shop/ShopHeader";
import { ShopListItemProps } from "./ShopListTypes";

const shopCardStyle = {
  width: "30vw",
  height: "20vh",
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

const buttonStyle = {
  textTransform: "none" as const,
  fontSize: "14px",
};

const buttonIconStyle = {
  marginLeft: "8px",
};

const ShopListItem: React.FC<ShopListItemProps> = ({
  shopData,
  startTime,
  endTime,
}: ShopListItemProps) => (
  <Card style={shopCardStyle}>
    <ShopHeader locationData={shopData.locationData} onBackClick={() => console.error("eh")} />

    <div style={shopContentStyle}>
      <Typography>
        Opening times: {startTime} - {endTime}
      </Typography>
    </div>

    <Button
      variant="contained"
      size="large"
      color="secondary"
      style={buttonStyle}
      onClick={() => console.error("Button pressed, open za view.")}
    >
      Click here for details
      <MoreHorizIcon style={buttonIconStyle} />
    </Button>
  </Card>
);

export default ShopListItem;
