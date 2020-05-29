import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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

const iconButtonStyle = {
  position: "absolute" as const,
  marginLeft: "24px",
  color: "#FFF",
  backgroundColor: colors.blue1,
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

const ShopHeader: React.FC<ShopHeaderProps> = ({ shopData, onBackClick }: ShopHeaderProps) => (
  <div style={shopHeaderStyle}>
    <div style={{ backgroundImage: `url(${shopData.photoReference})`, ...imgContainerStyle }}>
      <IconButton size="medium" style={iconButtonStyle} onClick={onBackClick}>
        <ArrowBackIcon />
      </IconButton>
    </div>

    <div style={nameContainerStyle}>
      <Typography variant="h6" style={{ color: "white" }}>
        {shopData.name}
      </Typography>

      <div style={dividerStyle} />

      <Typography variant="subtitle1" style={{ color: colors.blue3 }}>
        {shopData.roadName}
      </Typography>
    </div>
  </div>
);

export default ShopHeader;
