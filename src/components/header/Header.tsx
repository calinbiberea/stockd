import React, { PropsWithChildren, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Card,
  IconButton,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Logo from "../../res/logo.png";
import { HeaderProps } from "./HeaderTypes";
import { HomeContext } from "../App";

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      color: "#FFF",
      marginRight: "16px",
    },
    logoContainer: {
      padding: "6px",
    },
    logo: {
      maxHeight: "28px",
    },
  })
);

const Header: React.FC<HeaderProps> = ({
  title,
  onBackClick,
  children,
}: PropsWithChildren<HeaderProps>) => {
  const classes = useStyles();
  const {setRoute} = useContext(HomeContext);

  const logo = (
    <IconButton
      onClick= {() => setRoute("landing")}>
      <Card className={classes.logoContainer}>
        <img src={Logo} alt="stockd logo" className={classes.logo} />
      </Card>
    </IconButton>
  );

  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="back"
            onClick={onBackClick}
            className={classes.iconButton}
          >
            <ArrowBackIcon />
          </IconButton>

          {title !== undefined ? <Typography variant="h6">{title}</Typography> : logo}

          {children !== undefined ? children : null}
        </Toolbar>
      </AppBar>

      <Toolbar />
    </div>
  );
};

export default Header;
