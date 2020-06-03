import React, { useState } from "react";
import "./App.css";
import Landing from "./landing/Landing";
import ShopList from "./shopList/ShopList";
import FilterShops from "./filterShops/FilterShops";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import colors from "../res/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue1,
    },
    secondary: {
      main: colors.blue3,
    },
  },
});

const App: React.FC = () => {
  const [route, setRoute] = useState("landing" as Route);
  const resetRoute = () => setRoute("landing");

  let currentScreen;
  switch (route) {
    case "landing":
      currentScreen = <Landing setRoute={setRoute} />;
      break;
    case "filterShops":
      currentScreen = <FilterShops onBack={resetRoute} />;
      break;
    case "findShop":
      currentScreen = <ShopList />;
      break;
    case "editShop":
      currentScreen = null; // TODO: add screen
      break;
  }

  return <ThemeProvider theme={theme}>{currentScreen}</ThemeProvider>;
};

export default App;
