import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import { HeaderProps } from "./HeaderTypes";

const iconButtonStyle = {
  color: "#FFF",
  marginRight: "16px",
};

const Header: React.FC<HeaderProps> = ({ title, onBackClick }: HeaderProps) => (
  <div>
    <AppBar>
      <Toolbar>
        <IconButton edge="start" aria-label="back" style={iconButtonStyle} onClick={onBackClick}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>

    <Toolbar />
  </div>
);

export default Header;
