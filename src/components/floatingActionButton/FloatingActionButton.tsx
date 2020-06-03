import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import colors from "../../res/colors";

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

export interface FABProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FABProps> = ({ onClick }: FABProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab variant="extended" style={{ backgroundColor: colors.blue1 }} onClick={onClick}>
        <EditIcon className={classes.extendedIcon} />
        Update Info
      </Fab>
    </div>
  );
};
