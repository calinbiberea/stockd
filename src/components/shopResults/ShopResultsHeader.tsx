import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  createStyles,
  Divider,
  IconButton,
  makeStyles,
  Popover,
  Theme,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";
import Header from "../header/Header";
import SortByMenu from "./SortByMenu";
import { ShopResultsHeaderProps } from "./ShopResultsTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    controlsWrapper: {
      marginLeft: "auto",
    },
    controlsContainer: {
      display: "flex",
      flexDirection: "row",
      padding: "0 10px",
      alignItems: "center",
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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const menuEl = useRef(null);
  const classes = useStyles();

  const isSmallScreen = !useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const viewButton = (
    <Button
      color="primary"
      variant="contained"
      size="small"
      style={{ width: "150px" }}
      onClick={() => setView({ map: "list", list: "map" }[view])}
    >
      {{ list: <MapIcon />, map: <ListIcon /> }[view]}
      &nbsp; Swap to {{ map: "list", list: "map" }[view]}
    </Button>
  );

  const controls = (
    <Card className={classes.controlsContainer}>
      <Typography component="div">{viewButton}</Typography>
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
  );

  return (
    <Header onBackClick={onBackClick}>
      <div className={classes.controlsWrapper}>
        {isSmallScreen ? (
          <>
            <IconButton ref={menuEl} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
              <MenuIcon style={{ color: "#FFFFFF" }} />
            </IconButton>
            <Popover
              open={isPopoverOpen}
              anchorEl={menuEl.current}
              onClose={() => setIsPopoverOpen(false)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {controls}
            </Popover>
          </>
        ) : (
          controls
        )}
      </div>
    </Header>
  );
};

export default ShopResultsHeader;
