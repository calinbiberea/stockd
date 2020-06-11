import React from "react";
import SafetyScore from "./SafetyScore";
import { SafetyOverviewProps } from "./ShopTypes";

const SafetyOverview: React.FC<SafetyOverviewProps> = ({ safetyRating }: SafetyOverviewProps) => {
  return (
    <div>
      <SafetyScore safetyScore={safetyRating} />
    </div>
  );
};

export default SafetyOverview;
