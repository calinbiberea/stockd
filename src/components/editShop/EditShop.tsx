import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Overlay from "../overlay/Overlay";
import Header from "../header/Header";
import Map from "../map/Map";
import LocationSearch from "../filterShops/LocationSearch";
import { geocodeByPlaceId } from "../../util/googleMaps";
import { EditShopProps } from "./EditShopTypes";

const buttonStyle = {
  textTransform: "none" as const,
  fontSize: "18px",
};

const subtitleContainerStyle = {
  margin: "20px",
  padding: "20px",
};

const defaultCenter = {
  lat: 51.49788,
  lng: -0.183699,
};

const EditShop: React.FC<EditShopProps> = ({ setRoute }: EditShopProps) => {
  const [currentPlaceId, setCurrentPlaceId] = useState("");
  const [location, setLocation] = useState<google.maps.places.AutocompletePrediction | null>(null);
  const [currentCenter, setCurrentCenter] = useState(defaultCenter);

  const closeOverlay = () => setCurrentPlaceId("");
  const onPlaceClick = (placeId: string) => setCurrentPlaceId(placeId);

  const onButtonClick = () => {
    if (location) {
      geocodeByPlaceId(location.place_id)
        .then((latLng) => {
          const newCenter = {
            lat: latLng.lat(),
            lng: latLng.lng(),
          };

          setCurrentCenter(newCenter);
        })
        .catch((reason) => console.error(`Geocoding failed with status ${reason}`));
    } else {
      console.error("Location required");
    }
  };

  return (
    <div>
      <Header title="Stockd" onBackClick={() => setRoute("landing")} />

      <Card style={subtitleContainerStyle} variant={"outlined"}>
        <LocationSearch location={location} setLocation={setLocation} />

        <Button
          variant="contained"
          size="large"
          color="primary"
          style={buttonStyle}
          onClick={onButtonClick}
        >
          Place me there
        </Button>
      </Card>

      <Overlay placeId={currentPlaceId} closeOverlay={closeOverlay} queryMap defaultToStock />

      <Map onPlaceClick={onPlaceClick} currentCenter={currentCenter} />
    </div>
  );
};

export default EditShop;
