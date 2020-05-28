import React, { useState } from "react";
import "./App.css";
import MapScreen from "./map/MapScreen";
import Header from "./header/Header";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PlaceIdContext = React.createContext("");

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
