import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Landing from "./landing/Landing";
import FilterShops from "./filterShops/FilterShops";
import FindShop from "./findShop/FindShop";
import EditShop from "./editShop/EditShop";
import colors from "../res/colors";
import CloseSnackbarButton from "./CloseSnackbarButton";

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
      currentScreen = <FindShop setRoute={setRoute} />;
      break;
    case "editShop":
      currentScreen = <EditShop setRoute={setRoute} />;
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider action={(key) => <CloseSnackbarButton id={key} />}>
        <LoginContext.Provider value={{ uid, setUid }}>{currentScreen}</LoginContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
