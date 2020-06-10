import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Landing from "./landing/Landing";
import FilterShops from "./filterShops/FilterShops";
import EditShop from "./editShop/EditShop";
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

export const LoginContext = React.createContext({
  uid: null as string | null,
  setUid: (uid: string) => {
    /* void */
  },
});

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>("landing");
  const [uid, setUid] = useState<string | null>(null);

  let currentScreen: React.ReactNode;
  switch (route) {
    case "landing":
      currentScreen = <Landing setRoute={setRoute} />;
      break;
    case "filterShops":
      currentScreen = <FilterShops setRoute={setRoute} />;
      break;
    case "findShop":
      currentScreen = null; // TODO: add a screen for finding by name
      break;
    case "editShop":
      currentScreen = <EditShop setRoute={setRoute} />;
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <LoginContext.Provider value={{ uid, setUid }}>
          {currentScreen}
        </LoginContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
