import React, { useState } from "react";
import "./App.css";
import Landing from "./landing/Landing";

const App: React.FC = () => {
  const [route, setRoute] = useState("landing" as Route);

  let currentScreen;
  switch (route) {
    case "landing":
      currentScreen = <Landing setRoute={setRoute} />;
      break;
    case "filterShops":
      currentScreen = null; // TODO: add screen
      break;
    case "findShop":
      currentScreen = null; // TODO: add screen
      break;
    case "editShop":
      currentScreen = null; // TODO: add screen
      break;
  }

  return currentScreen;
};

export default App;
