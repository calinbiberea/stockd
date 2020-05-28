import React, { useState } from "react";
import "./App.css";
import MapScreen from "./map/MapScreen";
import Header from "./header/Header";
import Overlay from "./overlay/Overlay";

const App: React.FC = () => {
  const [currentPlaceId, setCurrentPlaceId] = useState("");

  const onPlaceClick = (placeId: string) => {
    setCurrentPlaceId(placeId);
  };

  const closeOverlay = () => setCurrentPlaceId("");

  return (
    <div>
      <Header />
      <Overlay placeId={currentPlaceId} closeOverlay={closeOverlay} />
      <MapScreen onPlaceClick={onPlaceClick} />
    </div>
  );
};

export default App;
