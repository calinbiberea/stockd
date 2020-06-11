import React from "react";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SelectorPanelProps } from "./FilterShopsTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      minWidth: "75vw",
    },
    button: {
      marginLeft: "16px",
    },
  })
);

const SelectorPanel: React.FC<SelectorPanelProps> = ({
  title,
  selected,
  items,
  onSelect,
  onReset,
}: SelectorPanelProps) => {
  const classes = useStyles();

  const selectedCount = Object.values(selected).filter((selected) => selected).length;
  const gridItems = Object.entries(items).map(([id, item]) => (
    <Grid item key={id}>
      <Button
        size="large"
        variant="contained"
        color={selected[id] ? "primary" : "default"}
        style={selected[id] ? {} : { backgroundColor: "#FFF" }}
        onClick={() => onSelect(id)}
      >
        {item}
      </Button>
    </Grid>
  ));

  return (
    <ExpansionPanel defaultExpanded variant="outlined" className={classes.container}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="primary" />}>
        <Typography color="primary">
          {title} <i>({selectedCount} selected)</i>
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          disabled={selectedCount === 0}
          className={classes.button}
          onFocus={(e) => e.stopPropagation}
          onClick={(e) => {
            onReset();
            e.stopPropagation();
          }}
        >
          Clear
        </Button>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          {gridItems}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default SelectorPanel;
