import React, { useEffect, useState } from "react";
import { Fade } from "@material-ui/core";
import logo from "../res/logo.png";

const fadeStyle = {
  position: "absolute" as const,
  zIndex: 2000,
  width: "100vw",
};

const logoContainerStyle = {
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  height: "100vh",
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
    <Fade in={!loaded} style={fadeStyle} timeout={{ enter: 0, exit: 1000 }}>
      <div style={logoContainerStyle}>
        <img src={logo} alt="logo" style={logoStyle} />
      </div>
    </Fade>
  );
};

export default Splash;
