import React from "react";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SelectorPanelProps } from "./FilterShopsTypes";

const SelectorPanel: React.FC<SelectorPanelProps> = ({
  title,
  selected,
  items,
  onSelect,
  onReset,
}: SelectorPanelProps) => {
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
        {item.name}
      </Button>
    </Grid>
  ));

  return (
    <ExpansionPanel defaultExpanded variant={"outlined"} style={{ minWidth: "75vw" }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="primary" />}>
        <Typography color="primary">
          {title} <i>({selectedCount} selected)</i>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            disabled={selectedCount === 0}
            style={{ marginLeft: "15px" }}
            onFocus={(e) => e.stopPropagation}
            onClick={(e) => {
              onReset();
              e.stopPropagation();
            }}
          >
            Clear
          </Button>
        </Typography>
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
