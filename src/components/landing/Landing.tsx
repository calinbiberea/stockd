import React from "react";
import colors from "../../res/colors";
import LandingTile from "./LandingTile";
import type { LandingProps, LandingTileProps } from "./LandingTypes";
import LandingHeader from "./LandingHeader";

const itemExamples = [
  "milk",
  "eggs",
  "pasta",
  "flour",
  "toilet paper",
  "water",
  "soft drinks",
  "beer",
];

const shopExamples = [
  "Tesco",
  "Sainsbury's",
  "Morrison's",
  "Aldi",
  "Asda",
  "Lidl",
  "the corner shop",
  "the supermarket",
];

const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  backgroundColor: colors.blue3,
};

const flexElemStyle = {
  flex: "1",
};

const dividerStyle = {
  position: "relative" as const,
  top: "0",
  left: "10%",
  width: "80%",
  height: "2px",
  backgroundColor: colors.blue1,
  borderRadius: "1px",
};

const tileContainerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  flex: 9,
  margin: "0 10vw",
};

const FlexedLandingTile: React.FC<LandingTileProps> = (props: LandingTileProps) => (
  <div style={flexElemStyle}>
    <div style={dividerStyle} />
    <LandingTile {...props} />
  </div>
);

const Landing: React.FC<LandingProps> = ({ setRoute }: LandingProps) => (
  <div style={containerStyle}>
    <LandingHeader />
    <div style={tileContainerStyle}>
      <FlexedLandingTile
        headerText="I'm looking for..."
        items={itemExamples}
        buttonText="Where should I go?"
        altButton={false}
        onClick={() => setRoute("filterShops")}
      />
      <FlexedLandingTile
        headerText="I'm going to shop at..."
        items={shopExamples}
        buttonText="What will I find there?"
        altButton={false}
        onClick={() => setRoute("findShop")}
      />
      <FlexedLandingTile
        headerText="I'm currently at..."
        items={shopExamples}
        buttonText="I'd like to contribute some data!"
        altButton={true}
        onClick={() => setRoute("findShop")}
      />
    </div>
  </div>
);

export default Landing;
