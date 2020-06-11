import React from "react";
import SafetyScore from "./SafetyScore";
import { SafetyOverviewProps } from "./ShopTypes";

const SafetyOverview: React.FC<SafetyOverviewProps> = ({ safety }: SafetyOverviewProps) => {
  return (
    <div>
      <SafetyScore safetyScore={safety.safetyScore} />
    </div>
  );
};

export default SafetyOverview;
