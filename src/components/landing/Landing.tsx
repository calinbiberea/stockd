import React from "react";
import { Divider, makeStyles, createStyles } from "@material-ui/core";
import colors from "../../res/colors";
import LandingTile from "./LandingTile";
import LandingHeader from "./LandingHeader";
import type { LandingProps } from "./LandingTypes";

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

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: "100vh",
      margin: "0 10vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    divider: {
      width: "80%",
      height: "2px",
      backgroundColor: colors.blue1,
      borderRadius: "1px",
      margin: "10px 0",
    },
  })
);

const Landing: React.FC<LandingProps> = ({ setRoute }: LandingProps) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <LandingHeader />

      <Divider className={classes.divider} />

      <LandingTile
        headerText="I'm looking for..."
        items={itemExamples}
        buttonText="Where should I go?"
        onClick={() => setRoute("filterShops")}
      />

      <Divider className={classes.divider} />

      <LandingTile
        headerText="I'm going to shop at..."
        items={shopExamples}
        buttonText="What will I find there?"
        onClick={() => setRoute("findShop")}
      />

      <Divider className={classes.divider} />

      <LandingTile
        headerText="I'm currently at..."
        items={shopExamples}
        buttonText="I'd like to contribute!"
        onClick={() => setRoute("editShop")}
      />
    </div>
  );
};

export default Landing;
