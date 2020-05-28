import React, { useState } from "react";
import "./App.css";
import MapScreen from "./components/map/MapScreen";
import Header from "./components/header/Header";

const PlaceIdContext = React.createContext("");

const App: React.FC = () => {
  const [currentPlaceId, setCurrentPlaceId] = useState("");

  const onPlaceClick = (placeId: string) => {
    // eslint-disable-next-line no-console
    console.log("Clicked on " + placeId);
    setCurrentPlaceId(placeId);
  };

  return (
    <div>
      <Header />
      <MapScreen onPlaceClick={onPlaceClick} />
    </div>
  );
};

export default App;
