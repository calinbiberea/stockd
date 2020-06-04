import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface FABProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FABProps> = ({ onClick }: FABProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab variant="extended" onClick={onClick}>
        <EditIcon className={classes.extendedIcon} />
        Update Info
      </Fab>
    </div>
  );
};
