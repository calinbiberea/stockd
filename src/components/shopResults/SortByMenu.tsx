import React, { useState, MouseEvent } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { SortByMenuProps } from "./ShopResultsTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.background.paper,
      padding: "0 8px",
      borderRadius: "4px",
    },
    list: {
      padding: 0,
    },
    listItem: {
      padding: 0,
    },
    listItemText: {
      margin: 0,
    },
  })
);

const options = ["Distance", "Safety Rating"];

const SortByMenu: React.FC<SortByMenuProps> = ({ setSortBy }: SortByMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const classes = useStyles();

  const onListItemClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuItemClick = (event: MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);

    switch (index) {
      case 0:
        setSortBy("distance");
        break;
      case 1:
        setSortBy("safetyRating");
        break;
      default:
        console.error("Invalid index in SortByMenu");
    }

    setAnchorEl(null);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  const menuItems = options.map((option, index) => (
    <MenuItem
      key={option}
      selected={index === selectedIndex}
      onClick={(event) => onMenuItemClick(event, index)}
    >
      {option}
    </MenuItem>
  ));

  return (
    <>
      <List component="nav" aria-label="Sort by" className={classes.list}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="sort-menu"
          aria-label="sort by"
          className={classes.listItem}
          onClick={onListItemClick}
        >
          <ListItemText
            primary="Sort by"
            secondary={options[selectedIndex]}
            primaryTypographyProps={{ color: "primary" }}
            className={classes.listItemText}
          />
        </ListItem>
      </List>

      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {menuItems}
      </Menu>
    </>
  );
};

export default SortByMenu;
