import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import colors from "../res/colors";
import Landing from "./landing/Landing";
import FilterShops from "./filterShops/FilterShops";
import FindShop from "./findShop/FindShop";
import EditShop from "./editShop/EditShop";
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
  setUid: (() => {
    /* void */
  }) as (uid: string | null) => void,
});

export const HomeContext = React.createContext({
  setRoute: (() => {
    /* void */
  }) as (route: Route) => void,
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
      currentScreen = <FindShop editShop={false} setRoute={setRoute} />;
      break;
    case "editShop":
      currentScreen = <EditShop setRoute={setRoute} />;
      break;
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider action={(key) => <CloseSnackbarButton id={key} />}>
        <HomeContext.Provider value={{ setRoute }}>
          <LoginContext.Provider value={{ uid, setUid }}>{currentScreen}</LoginContext.Provider>
        </HomeContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
