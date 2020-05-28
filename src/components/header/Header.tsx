import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "./Logo";
import Search from "./Search";

const Header: React.FC = () => (
  <AppBar position="fixed" style={{ backgroundColor: "rgba(0, 0, 0, 0)", boxShadow: "none" }}>
    <Toolbar>
      <Logo />
      <Search />
    </Toolbar>
  </AppBar>
);

export default Header;
