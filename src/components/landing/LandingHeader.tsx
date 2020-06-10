import React from "react";
import { Card, Typography, makeStyles, createStyles } from "@material-ui/core";
import Logo from "../../res/logo.png";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
      padding: "20px 0",
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
    card: {
      padding: "10px",
    },
    welcome: {
      fontSize: "1.5vh",
    },
    logo: {
      maxHeight: "4vh",
    },
  })
);

const LandingHeader: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Typography variant="h6" color="primary" className={classes.welcome}>
          Welcome to
        </Typography>

        <img src={Logo} alt="stockd logo" className={classes.logo} />
      </Card>
    </div>
  );
};

export default LandingHeader;
