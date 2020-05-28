import logo from "./stockd.png";
import Card from "@material-ui/core/Card";
import React from "react";

const cardStyle = {
  width: "160px",
  height: "40px",
  background: "#FFF",
  padding: "5px",
};

const divStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${logo})`,
  backgroundSize: "contain",
};

const Logo: React.FC = () => (
  <Card style={cardStyle}>
    <div style={divStyle}>&nbsp;</div>
  </Card>
);

export default Logo;
