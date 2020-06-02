import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import colors from "../../res/colors";
import { NewHeaderProps } from "./LandingTypes";

const appBarStyle = {
  backgroundColor: colors.blue1,
};

const iconButtonStyle = {
  color: "#FFF",
  marginRight: "16px",
};

const NewHeader: React.FC<NewHeaderProps> = ({ title, onBackClick }: NewHeaderProps) => (
  <div>
    <AppBar position="fixed" style={appBarStyle}>
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

export default NewHeader;
