import { createStyles, makeStyles } from "@material-ui/core/styles";

export const SAFETY_FEATURE_THRESHOLD = 30;

export const DISTANCES = [1, 3, 5, 10];

export const useFilterScreenStyles = makeStyles((theme) =>
  createStyles({
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "auto",
    },
    title: {
      padding: "20px",
    },
    contentContainer: {
      margin: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    locationContainer: {
      marginTop: "8px",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    distanceSelect: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    locationDivider: {
      margin: `0px ${theme.spacing(2)}px`,
      [theme.breakpoints.down("xs")]: {
        visibility: "hidden",
      },
    },
    button: {
      margin: "auto 20px 16px",
      flex: 0,
    },
    buttonIcon: {
      marginLeft: "16px",
    },
  })
);
