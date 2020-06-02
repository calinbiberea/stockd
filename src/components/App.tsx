import React, { useState } from "react";
import "./App.css";
import Landing from "./landing/Landing";
import FilterShops from "./filterShops/FilterShops";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import colors from "../res/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue1,
    },
  },
});

const App: React.FC = () => {
  const [route, setRoute] = useState("filterShops" as Route);

  let currentScreen;
  switch (route) {
    case "landing":
      currentScreen = <Landing setRoute={setRoute} />;
      break;
    case "filterShops":
      currentScreen = <FilterShops />;
      break;
    case "findShop":
      currentScreen = null; // TODO: add screen
      break;
    case "editShop":
      currentScreen = null; // TODO: add screen
      break;
  }

  return <ThemeProvider theme={theme}>{currentScreen}</ThemeProvider>;
};

export default App;
