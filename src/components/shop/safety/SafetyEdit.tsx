import React, { useState } from "react";
import {
  Button,
  Divider,
  FormGroup,
  FormControlLabel,
  Grid,
  Switch,
  useMediaQuery,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import SafetyScore from "./SafetyScore";
import { SafetyEditProps } from "../ShopTypes";
import SafetyItem from "./SafetyItem";
import { SafetyFeatureId, safetyFeatures } from "../../../util/productsAndSafetyFeatures";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      overflow: "auto",
    },
    safetyScoreContainer: {
      margin: "16px 0 8px",
    },
    gridContainer: {
      overflow: "auto",
    },
    gridItem: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    safetyItem: {
      [theme.breakpoints.up("md")]: {
        width: "50%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
    },
    gridDivider: {
      width: "80%",
      height: "2px",
      margin: "4px 0",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: "8px",
    },
    buttonDivider: {
      width: "16px",
    },
  })
);

const getSubmitSuffix = (numUpdates: number) =>
  numUpdates === 0 ? undefined : `${numUpdates} update${numUpdates === 1 ? "" : "s"}`;

const SafetyEdit: React.FC<SafetyEditProps> = ({
  safetyScore,
  usedSafetyFeatures,
}: SafetyEditProps) => {
  const [localSafetyScore, setLocalSafetyScore] = useState(safetyScore);
  const [localSafetyFeatures, setLocalSafetyFeatures] = useState<Record<string, boolean>>({});

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();

  const numUpdates =
    Object.keys(localSafetyFeatures).length + (localSafetyScore !== safetyScore ? 1 : 0);
  const numSafetyFeatures = Object.keys(usedSafetyFeatures).length;

  const safetyFeaturesAndSwitches = Object.entries(safetyFeatures).map(
    ([featureId, { name }], ix) => {
      const currentValue = localSafetyFeatures[name];
      const updated = currentValue !== undefined;
      const last = ix === numSafetyFeatures - 1;

      const onSwitchChange = (_: React.ChangeEvent<unknown>, newValue: boolean) =>
        setLocalSafetyFeatures((prevState) => ({ ...prevState, [name]: newValue }));

      return (
        <Grid item xs={12} key={featureId} className={classes.gridItem}>
          <div className={classes.safetyItem}>
            <SafetyItem
              feature={featureId as SafetyFeatureId}
              value={usedSafetyFeatures[featureId as SafetyFeatureId]}
            />
          </div>

          <FormGroup>
            <FormControlLabel
              label="Required"
              control={
                <Switch
                  checked={updated ? currentValue : true}
                  color={updated ? "primary" : "secondary"}
                  onChange={onSwitchChange}
                />
              }
            />
          </FormGroup>

          {smallScreen && !last ? (
            <Divider variant="middle" orientation="horizontal" className={classes.gridDivider} />
          ) : undefined}
        </Grid>
      );
    }
  );

  const onClearClick = () => {
    setLocalSafetyScore(safetyScore);
    setLocalSafetyFeatures({});
  };

  const onSubmitClick = () => {
    console.warn("uh oh");
    onClearClick();
  };

  return (
    <div className={classes.container}>
      <div className={classes.safetyScoreContainer}>
        <SafetyScore
          safetyScore={localSafetyScore}
          setSafetyScore={setLocalSafetyScore}
          size={smallScreen ? "medium" : "large"}
        />
      </div>

      <Grid container className={classes.gridContainer}>
        {safetyFeaturesAndSwitches}
      </Grid>

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          disabled={numUpdates === 0}
          onClick={onSubmitClick}
        >
          Submit {getSubmitSuffix(numUpdates)}
        </Button>

        <div className={classes.buttonDivider} />

        <Button
          variant="contained"
          color="secondary"
          disabled={numUpdates === 0}
          onClick={onClearClick}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default SafetyEdit;
