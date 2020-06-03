import { Card, Typography } from "@material-ui/core";
import Logo from "../../res/logo.png";
import React from "react";

const containerStyle = {
  width: "100%",
  position: "relative" as const,
  padding: "20px 0",
};

const cardStyle = {
  position: "relative" as const,
  display: "inline-block",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center" as const,
  padding: "10px",
};

const welcomeStyle = {
  fontSize: "1.5vh",
};

const logoStyle = {
  maxHeight: "4vh",
};

const LandingHeader: React.FC = () => (
  <div style={containerStyle}>
    <Card style={cardStyle}>
      <Typography variant="h6" color="primary" style={welcomeStyle}>
        Welcome to
      </Typography>

      <img style={logoStyle} src={Logo} alt="stockd logo" />
    </Card>
  </div>
);

export default LandingHeader;
