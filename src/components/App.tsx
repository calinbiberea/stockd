import React, { useState } from "react";
import "./App.css";
import Splash from "./Splash";
import Map from "./map/Map";
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
      <Splash />
      <Header />
      <Overlay placeId={currentPlaceId} closeOverlay={closeOverlay} />
      <Map onPlaceClick={onPlaceClick} />
    </div>
  );
};

export default App;
