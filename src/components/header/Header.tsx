import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "./Logo";
import Search from "./Search";

const appBarStyle = {
  boxShadow: "none",
  backgroundColor: "transparent",
};

const dividerStyle = {
  width: "16px",
};

const Header: React.FC = () => (
  <AppBar position="fixed" style={appBarStyle}>
    <Toolbar>
      <Logo />

      <div style={dividerStyle} />

      <Search />
    </Toolbar>
  </AppBar>
);

export default Header;
