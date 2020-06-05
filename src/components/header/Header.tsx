import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import { HeaderProps } from "./HeaderTypes";
import Logo from "../../res/logo.png";
import { Card } from "@material-ui/core";

const iconButtonStyle = {
  color: "#FFF",
  marginRight: "16px",
};

const logo = (
  <Card style={{ padding: "6px", display: "inline-block" }}>
    <img alt="stock" src={Logo} style={{ maxHeight: "28px" }} />
  </Card>
);

const Header: React.FC<HeaderProps> = ({ title, onBackClick }: HeaderProps) => (
  <div>
    <AppBar>
      <Toolbar>
        <IconButton edge="start" aria-label="back" style={iconButtonStyle} onClick={onBackClick}>
          <ArrowBackIcon />
        </IconButton>

        {title !== undefined ? <Typography variant="h6">{title}</Typography> : logo}
      </Toolbar>
    </AppBar>

    <Toolbar />
  </div>
);

export default Header;
