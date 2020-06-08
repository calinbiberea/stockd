import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Landing from "./landing/Landing";
import FilterShops from "./filterShops/FilterShops";
import colors from "../res/colors";
import EditShop from "./editShop/EditShop";
import FindShop from "./findShop/FindShop";

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
  const [route, setRoute] = useState<Route>("landing");

  let currentScreen: React.ReactNode;
  switch (route) {
    case "landing":
      currentScreen = <Landing setRoute={setRoute} />;
      break;
    case "filterShops":
      currentScreen = <FilterShops setRoute={setRoute} />;
      break;
    case "findShop":
      currentScreen = <FindShop setRoute={setRoute} />;
      break;
    case "editShop":
      currentScreen = <EditShop setRoute={setRoute} />;
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>{currentScreen}</SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
