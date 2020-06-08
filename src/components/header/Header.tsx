import React, { PropsWithChildren } from "react";
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

  const logo = (
    <Card className={classes.logoContainer}>
      <img src={Logo} alt="stockd logo" className={classes.logo} />
    </Card>
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
          {children !== undefined ? <div style={{ marginLeft: "20px" }}>{children}</div> : null}
        </Toolbar>
      </AppBar>

      <Toolbar />
    </div>
  );
};

export default Header;
