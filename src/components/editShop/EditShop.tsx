import React, { useState } from "react";
import Overlay from "../overlay/Overlay";
import Header from "../header/Header";
import Map from "../map/Map";
import { EditShopProps } from "./EditShopTypes";

const defaultCenter = {
  lat: 51.49788,
  lng: -0.183699,
};

const EditShop: React.FC<EditShopProps> = ({ setRoute }: EditShopProps) => {
  const [currentPlaceId, setCurrentPlaceId] = useState("");

  const closeOverlay = () => setCurrentPlaceId("");
  const onPlaceClick = (placeId: string) => setCurrentPlaceId(placeId);

  return (
    <div>
      <Header onBackClick={() => setRoute("landing")} />

      <Overlay placeId={currentPlaceId} closeOverlay={closeOverlay} queryMap defaultToStock />

      <Map onPlaceClick={onPlaceClick} currentCenter={defaultCenter} />
    </div>
  );
};

export default EditShop;
