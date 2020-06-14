import React, { useContext } from "react";
import {
  Backdrop,
  Button,
  Card,
  IconButton,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { EditShopProps } from "./EditShopTypes";
import { LoginContext } from "../App";
import GoogleIcon from "../../res/google.png";
import FacebookIcon from "../../res/facebook.png";
import { Provider, logIn } from "../../firebase/firebaseLogin";
import { useSnackbar } from "notistack";
import FindShop from "../findShop/FindShop";

const useStyles = makeStyles(() =>
  createStyles({
    backdrop: {
      zIndex: 2001,
    },
    cardContainer: {
      textAlign: "center",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    },
    iconContainer: {
      margin: "24px 0",
    },
    icon: {
      width: "48px",
      height: "48px",
    },
  })
);

const EditShop: React.FC<EditShopProps> = ({ setRoute }: EditShopProps) => {
  const { uid, setUid } = useContext(LoginContext);

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const onBackClick = () => setRoute("landing");

  const performLogin = (provider: Provider) => async () => {
    const uid = await logIn(provider, enqueueSnackbar);
    if (uid !== null) {
      setUid(uid);
    }
  };

  return (
    <>
      <FindShop setRoute={setRoute} editShop />

      <Backdrop className={classes.backdrop} open={uid === null} onClick={onBackClick}>
        <Card onClick={(e) => e.stopPropagation()} className={classes.cardContainer}>
          <Typography>Please log in to contribute data:</Typography>

          <div className={classes.iconContainer}>
            <IconButton onClick={performLogin("google")}>
              <img src={GoogleIcon} alt="Log in with Google" className={classes.icon} />
            </IconButton>

            <IconButton onClick={performLogin("facebook")}>
              <img src={FacebookIcon} alt="Log in with Facebook" className={classes.icon} />
            </IconButton>
          </div>

          <Button variant="contained" color="primary" size="small" onClick={onBackClick}>
            Go back
          </Button>
        </Card>
      </Backdrop>
    </>
  );
};

export default EditShop;
