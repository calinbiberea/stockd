import React from "react";
import Typography from "@material-ui/core/Typography";
import type MissingEnvProps from "./MissingEnvVarProps";

const MissingEnvVar: React.FC<MissingEnvProps> = ({ vars }: MissingEnvProps) => (
  <div>
    <Typography variant="h1">Oops!</Typography>
    <Typography variant="h4">
      The following environment variables are missing:
      <ul>
        {vars.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </Typography>
  </div>
);

export default MissingEnvVar;
