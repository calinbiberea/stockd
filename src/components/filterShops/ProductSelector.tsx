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
import { Product, ProductSelectorProps } from "./FilterShopsTypes";

const ProductSelector: React.FC<ProductSelectorProps> = ({
  selected,
  onSelect,
  onReset,
}: ProductSelectorProps) => {
  const selectedCount = Object.values(selected).filter((selected) => selected).length;
  const gridItems = Object.entries(selected).map(([product, selected]) => (
    <Grid item key={product}>
      <Button
        size="large"
        variant="contained"
        color={selected ? "primary" : "default"}
        style={selected ? {} : { backgroundColor: "#FFF" }}
        onClick={() => onSelect(product as Product)}
      >
        {product}
      </Button>
    </Grid>
  ));

  return (
    <ExpansionPanel defaultExpanded variant={"outlined"}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="primary" />}>
        <Typography color="primary">
          Products <i>({selectedCount} selected)</i>
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

export default ProductSelector;
