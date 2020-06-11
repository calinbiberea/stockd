import Header from "../header/Header";
import {
  Button,
  ButtonGroup,
  Card,
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SortByMenu from "./SortByMenu";
import React from "react";
import { ShopResultsHeaderProps } from "./ShopResultsTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    controlsContainer: {
      display: "flex",
      flexDirection: "row",
      padding: "0 10px",
      alignItems: "center",
      marginLeft: "auto",
    },
    controlsDivider: {
      margin: `0 ${theme.spacing(2)}px`,
    },
    sortByContainer: {
      minWidth: "96px",
      textAlign: "center",
    },
    sortByWrapper: {
      display: "inline-block",
    },
    sortBy: {
      marginLeft: "auto",
    },
  })
);

const ShopResultsHeader: React.FC<ShopResultsHeaderProps> = ({
  onBackClick,
  view,
  setView,
  setSortBy,
}: ShopResultsHeaderProps) => {
  const classes = useStyles();
  return (
    <Header onBackClick={onBackClick}>
      <Card className={classes.controlsContainer}>
        <Typography component="div">
          <ButtonGroup variant="contained" color="primary" size="small">
            <Button disabled={view === "list"} onClick={() => setView("list")}>
              List View
            </Button>
            <Button disabled={view === "map"} onClick={() => setView("map")}>
              Map View
            </Button>
          </ButtonGroup>
        </Typography>
        <Divider
          variant="fullWidth"
          orientation="vertical"
          flexItem
          className={classes.controlsDivider}
          style={{ margin: "0 10px" }}
        />
        <div className={classes.sortByContainer}>
          <div className={classes.sortByWrapper}>
            <SortByMenu setSortBy={setSortBy} className={classes.sortBy} />
          </div>
        </div>
      </Card>
    </Header>
  );
};

export default ShopResultsHeader;
