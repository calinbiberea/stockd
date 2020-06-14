import Map from "../map/Map";
import { Circle, Marker, OverlayView } from "@react-google-maps/api";
import React from "react";
import colors from "../../res/colors";
import { ShopMapProps } from "./ShopResultsTypes";
import ShopPinIcon from "../../res/shopPin.png";

const currentPositionMarker = (
  <div
    style={{
      zIndex: 2001,
      width: "16px",
      height: "16px",
      backgroundColor: colors.blue1,
      borderRadius: "100%",
      border: "2px solid white",
      boxSizing: "border-box",
      boxShadow: `0px 0px 24px 16px ${colors.blue3}`,
    }}
  />
);

const circleOptions = {
  strokeColor: colors.blue1,
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: colors.blue3,
  fillOpacity: 0.2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

const ShopMap: React.FC<ShopMapProps> = ({
  shopList,
  userPos,
  onShopSelect,
  maxDistance,
}: ShopMapProps) => {
  const markers = shopList.map((shop) => (
    <Marker
      key={shop.id}
      position={shop.locationData}
      onClick={() => onShopSelect(shop.locationData)}
      icon={ShopPinIcon}
    />
  ));

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute" }}>
      <Map currentCenter={userPos}>
        <OverlayView position={userPos} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          {currentPositionMarker}
        </OverlayView>
        <Circle center={userPos} radius={maxDistance * 1000} options={circleOptions} />
        {markers}
      </Map>
    </div>
  );
};

export default ShopMap;
