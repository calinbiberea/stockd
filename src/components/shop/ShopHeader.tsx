import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import logo from "../../res/logo.png";
import colors from "../../res/colors";
import { ShopHeaderProps } from "./ShopTypes";

const shopHeaderStyle = {
  width: "100%",
  height: "20%",
  display: "flex",
  flexDirection: "row" as const,
};

const imgContainerStyle = {
  width: "50%",
  display: "flex",
  alignItems: "center",
};

const iconButtonStyle = {
  position: "absolute" as const,
  marginLeft: "16px",
};

const imgStyle = {
  width: "100%",
};

const nameContainerStyle = {
  width: "50%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center" as const,
  alignItems: "center" as const,
  backgroundColor: colors.blue1,
};

const dividerStyle = {
  height: "5%",
};

const ShopHeader: React.FC<ShopHeaderProps> = ({ shopData, onBackClick }: ShopHeaderProps) => (
  <div style={shopHeaderStyle}>
    <div style={imgContainerStyle}>
      <IconButton size="medium" style={iconButtonStyle} color="primary" onClick={onBackClick}>
        <ArrowBackIcon />
      </IconButton>

      <img src={logo} alt="Shop preview" style={imgStyle} />
    </div>

    <div style={nameContainerStyle}>
      <Typography variant="h6" style={{ color: "white" }}>
        {shopData.name}
      </Typography>

      <div style={dividerStyle} />

      <Typography variant="subtitle1" style={{ color: colors.blue3 }}>
        {shopData.id}
      </Typography>
    </div>
  </div>
);

export default ShopHeader;
