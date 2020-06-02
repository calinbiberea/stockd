import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import colors from "../../res/colors";
import React from "react";
import { Product, ProductSelectorProps } from "./FilterShopsTypes";

const ProductSelector: React.FC<ProductSelectorProps> = ({
  selected,
  onSelect,
  onReset,
}: ProductSelectorProps) => {
  const selectedCount = Object.values(selected).filter((selected) => selected).length;
  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="primary" />}>
        <Typography color="primary">
          Products <i>({selectedCount} selected)</i>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={(e) => {
              onReset();
              e.stopPropagation();
            }}
            onFocus={(e) => e.stopPropagation}
            style={{ marginLeft: "15px" }}
            disabled={selectedCount === 0}
          >
            Clear
          </Button>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          {Object.entries(selected).map(([product, selected]) => (
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
          ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ProductSelector;
