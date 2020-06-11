import { Typography, makeStyles, createStyles } from "@material-ui/core";
import { ShopHeaderProps } from "./ShopTypes";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import colors from "../../res/colors";

const useStyles = makeStyles((theme) =>
  createStyles({
    backButton: {
      position: "absolute",
      color: "#FFF",
      backgroundColor: colors.blue1,
      [theme.breakpoints.down("xs")]: {
        marginTop: "50px",
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "20px",
      },
    },
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      backgroundColor: theme.palette.primary.main,
    },
    imgAndText: {
      width: "100%",
      height: "100%",
      display: "flex",

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column-reverse"
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row"
      },
    },
    imgContainer: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: "50%" ,
      },
      [theme.breakpoints.up("sm")]: {
        width: "50%",
        height: "100%" ,
      },
      display: "flex",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    nameRoadContainer: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        height: "50%" ,
        flexDirection: "row",
      },
      [theme.breakpoints.up("sm")]: {
        width: "50%",
        height: "100%" ,
        flexDirection: "column",
      },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    name: {
      color: "#FFF",
      [theme.breakpoints.down("xs")]: {
        padding: "3%",
        width: "60%",
        fontSize: "4vw",
        display: "flex",
      },
    },
    divider: {
      height: "5%",
    },
    road: {
      [theme.breakpoints.down("xs")]: {
        padding: "3%",
        width: "40%",
        fontSize: "3vw",
        display: "flex",
      },
      color: theme.palette.secondary.main,
    },
  })
);

export const ShopHeader: React.FC<ShopHeaderProps> = ({ locationData, noBackButton, onBackClick }: ShopHeaderProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {noBackButton ? null :
        <IconButton
          edge="start"
          size="small"
          aria-label="back"
          onClick={onBackClick}
          className={classes.backButton}
        >
          <ArrowBackIcon />
        </IconButton>
      }
      <div className={classes.imgAndText}>
        <div
          style={{ backgroundImage: `url(${locationData.photo})` }}
          className={classes.imgContainer}
        />

        <div className={classes.nameRoadContainer}>
          <Typography noWrap variant="h6" className={classes.name}>
            {locationData.name}
          </Typography>

          <div className={classes.divider} />

          <Typography noWrap variant="subtitle1" className={classes.road}>
            {locationData.road}
          </Typography>
        </div>
      </div>
     </div>
  );
};

export default ShopHeader;
