import { Button, createStyles, Divider, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TrophyIcon from "@material-ui/icons/EmojiEvents";
import { useSnackbar } from "notistack";
import GoogleIcon from "../../res/google.png";
import FacebookIcon from "../../res/facebook.png";
import { db } from "../../firebase/firebaseApp";
import { logIn, logOut, Provider } from "../../firebase/firebaseLogin";
import { getRankData, numRanks } from "../../util/ranks";
import { LoginProps } from "./FindShopTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      width: "32px",
      height: "32px",
    },
    flexRow: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      margin: `0 ${theme.spacing(2)}px`,
    },
    shadow: {
      filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))",
    },
  })
);

const Login: React.FC<LoginProps> = ({ uid, setUid }: LoginProps) => {
  const [userScore, setUserScore] = useState<number | null>(null);

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (uid === null) {
      return;
    }
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        setUserScore(data?.score ?? 0);
      });
    return () => {
      unsubscribe();
      setUserScore(null);
    };
  }, [uid]);

  const performLogin = (provider: Provider) => async () => {
    const uid = await logIn(provider, enqueueSnackbar);
    if (uid !== null) {
      setUid(uid);
    }
  };

  const performLogout = async () => {
    await logOut();
    enqueueSnackbar("You've logged out.", { variant: "info" });
    setUid(null);
  };

  if (uid === null) {
    return (
      <div className={classes.flexRow}>
        <Typography>
          <i>Please log in to contribute: </i>
        </Typography>
        &nbsp;&nbsp;
        <IconButton onClick={performLogin("google")} size="small">
          <img src={GoogleIcon} alt="Log in with Google" className={classes.icon} />
        </IconButton>
        &nbsp;
        <IconButton onClick={performLogin("facebook")} size="small">
          <img src={FacebookIcon} alt="Log in with Facebook" className={classes.icon} />
        </IconButton>
      </div>
    );
  } else {
    let rankDisplay = undefined;
    if (userScore !== null) {
      const { rank, nextRank, ix } = getRankData(userScore);
      rankDisplay = (
        <>
          <br />
          <div className={classes.flexRow}>
            <Typography style={{ fontSize: "1.2em" }}>{userScore} points -</Typography>
            &nbsp;
            <TrophyIcon
              className={classes.shadow}
              style={{ color: rank.color, fontSize: "1.2em" }}
            />
            <Typography className={classes.shadow} style={{ color: rank.color, fontSize: "1.2em" }}>
              {rank.name}
            </Typography>
            &nbsp;
            <Typography>
              ({ix + 1}
              <span style={{ fontSize: "0.8em" }}>/{numRanks}</span>)
            </Typography>
          </div>
          {nextRank !== null ? (
            <div className={classes.flexRow}>
              <Typography>{nextRank.score - userScore} points until</Typography>
              &nbsp;&nbsp;
              <TrophyIcon className={classes.shadow} style={{ color: nextRank.color }} />
              &nbsp;
              <Typography className={classes.shadow} style={{ color: nextRank.color }}>
                {nextRank.name}
              </Typography>
            </div>
          ) : undefined}
        </>
      );
    }
    return (
      <>
        <div className={classes.flexRow}>
          <Typography>
            <i>Logged in.</i>
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={performLogout} variant="contained" color="primary" size="small">
            Log out
          </Button>
        </div>
        {rankDisplay}
      </>
    );
  }
};

export default Login;
