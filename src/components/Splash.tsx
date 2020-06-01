import React, { useEffect, useState } from "react";
import { Fade } from "@material-ui/core";
import logo from "../res/logo.png";

const logoContainerStyle = {
  position: "absolute" as const,
  height: "100vh",
  width: "100vw",
  zIndex: 2000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
};

const logoStyle = {
  width: "40vw",
};

const Splash: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 1000);
  }, []);

  return (
    <Fade in={!loaded} timeout={{ enter: 0, exit: 1000 }}>
      <div style={logoContainerStyle}>
        <img src={logo} alt="logo" style={logoStyle} />
      </div>
    </Fade>
  );
};

export default Splash;
