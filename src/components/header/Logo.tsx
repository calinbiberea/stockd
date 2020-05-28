import React from "react";
import Card from "@material-ui/core/Card";
import logo from "../../res/logo.png";

const cardStyle = {
  width: "4.7504em",
  height: "1.1876em",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imgStyle = {
  width: "100%",
};

const Logo: React.FC = () => (
  <Card style={cardStyle}>
    <img src={logo} style={imgStyle} alt="logo" />
  </Card>
);

export default Logo;
