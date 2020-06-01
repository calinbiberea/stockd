import { Button, Card } from "@material-ui/core";
import colors from "../../res/colors";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import LandingScrollText from "./LandingScrollText";
import type { LandingTileProps } from "./LandingTypes";

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "relative" as const,
};

const cardStyle = {
  position: "relative" as const,
  padding: "20px",
  textAlign: "center" as const,
  display: "inline-block",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const innerContainerStyle = {
  overflowX: "hidden" as const,
  display: "inline-block",
  fontSize: "20px",
};

const buttonStyle = {
  backgroundColor: colors.blue1,
  textTransform: "none" as const,
  fontSize: "18px",
};

const buttonIconStyle = {
  marginLeft: "10px",
};

const scrollTextContainerStyle = {
  color: "rgba(0, 0, 0, 0.4)",
  margin: "10px 0",
  height: "20px",
};

const LandingTile: React.FC<LandingTileProps> = ({
  headerText,
  items,
  buttonText,
  altButton,
}: LandingTileProps) => (
  <div style={containerStyle}>
    <Card style={cardStyle}>
      <div style={innerContainerStyle}>
        {headerText}
        <div style={scrollTextContainerStyle}>
          &nbsp;
          <LandingScrollText items={items} />
        </div>
        <Button variant="contained" size="large" color="primary" style={buttonStyle}>
          {altButton ? <b>{buttonText}</b> : buttonText}
          <ArrowIcon style={buttonIconStyle} />
        </Button>
      </div>
    </Card>
  </div>
);

export default LandingTile;
