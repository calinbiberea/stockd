import React from "react";
import Typography from "@material-ui/core/Typography";
import colors from "../../res/colors";
import { ShopHeaderProps } from "./ShopTypes";

const shopHeaderStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "row" as const,
  backgroundColor: colors.blue1,
};

const imgContainerStyle = {
  flex: 1,
  width: "50%",
  display: "flex",
  alignItems: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const nameContainerStyle = {
  flex: 1,
  width: "50%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center" as const,
  alignItems: "center" as const,
};

const dividerStyle = {
  height: "5%",
};

export const ShopHeader: React.FC<ShopHeaderProps> = ({ locationData }: ShopHeaderProps) => (
  <div style={shopHeaderStyle}>
    <div style={{ backgroundImage: `url(${locationData.photo})`, ...imgContainerStyle }} />

    <div style={nameContainerStyle}>
      <Typography variant="h6" style={{ color: "white" }}>
        {locationData.name}
      </Typography>

      <div style={dividerStyle} />

      <Typography variant="subtitle1" style={{ color: colors.blue3 }}>
        {locationData.road}
      </Typography>
    </div>
  </div>
);

export default ShopHeader;
