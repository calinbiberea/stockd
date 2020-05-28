import React from "react";
import { IconButton, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import stockdPalette from "../../stockdPalette";
import shadows from "@material-ui/core/styles/shadows";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: stockdPalette.blue2,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    boxShadow: shadows[2],
  },
  icon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.search} style={{ marginLeft: "auto" }}>
      <div className={classes.icon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        endAdornment={
          <div style={{ marginRight: "5px" }}>
            <IconButton size="small">
              <ArrowIcon style={{ color: "#FFF" }} />
            </IconButton>
          </div>
        }
      />
    </div>
  );
};

export default Search;
