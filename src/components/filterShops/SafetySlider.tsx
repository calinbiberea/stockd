import React from "react";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Slider,
  Typography,
} from "@material-ui/core";
import StarFull from "@material-ui/icons/Star";
import StarHalf from "@material-ui/icons/StarHalf";
import StarEmpty from "@material-ui/icons/StarBorder";
import colors from "../../res/colors";
import type { SafetyRating, SafetySliderProps } from "./FilterShopsTypes";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const starRange = [0, 1, 2, 3, 4];

const padInt = (n: number) => (n % 1 === 0 ? `${n}.0` : `${n}`);

const SafetySlider: React.FC<SafetySliderProps> = ({
  minRating,
  setMinRating,
}: SafetySliderProps) => {
  const starForIx = (i: number) => {
    const starProps = { key: i, style: { fontSize: "72px", color: colors.blue1 } };
    const n = minRating - i;
    if (n <= 0) {
      return <StarEmpty {...starProps} />;
    }
    if (n >= 1) {
      return <StarFull {...starProps} />;
    }
    return <StarHalf {...starProps} />;
  };

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: colors.blue1 }} />}>
        <Typography style={{ color: colors.blue1 }}>
          Safety Rating{" "}
          <i>
            (
            {minRating === 0 ? (
              "no minimum"
            ) : (
              <>
                at least <b>{padInt(minRating)}</b> / 5
              </>
            )}
            )
          </i>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={(e) => {
              setMinRating(0);
              e.stopPropagation();
            }}
            onFocus={(e) => e.stopPropagation}
            style={{ marginLeft: "15px" }}
            disabled={minRating === 0}
          >
            Reset
          </Button>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{ width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "large", display: "inline-block" }}>
            {starRange.map(starForIx)}
            <Slider
              defaultValue={0}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={0}
              max={5}
              value={minRating}
              onChange={(_, newMin) => setMinRating(newMin as SafetyRating)}
              valueLabelFormat={padInt}
              style={{ marginTop: "25px" }}
            />
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default SafetySlider;
