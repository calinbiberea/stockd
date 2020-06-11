import React from "react";
import SafetyScore from "./SafetyScore";
import { SafetyOverviewProps } from "./ShopTypes";

const SafetyOverview: React.FC<SafetyOverviewProps> = ({
  safetyScore,
  safetyFeatures,
}: SafetyOverviewProps) => {
  return (
    <div>
      <SafetyScore safetyScore={safetyScore} />
    </div>
  );
};

export default SafetyOverview;
