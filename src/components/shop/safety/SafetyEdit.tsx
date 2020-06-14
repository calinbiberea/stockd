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
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import SafetyScore from "./SafetyScore";
import { EditResult, SafetyEditProps } from "../ShopTypes";
import SafetyItem from "./SafetyItem";
import { SafetyFeatureId, safetyFeatures } from "../../../util/productsAndSafetyFeatures";
import { updateSafety } from "../../../firebase/firebaseApp";
import { useSnackbar } from "notistack";
import colors from "../../../res/colors";
import { SAFETY_FEATURE_THRESHOLD } from "../../../util/consts";

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
  locationData,
  safetyScore,
  usedSafetyFeatures,
}: SafetyEditProps) => {
  const [localSafetyScore, setLocalSafetyScore] = useState<number | undefined>(undefined);
  const [localSafetyFeatures, setLocalSafetyFeatures] = useState<Record<string, boolean>>({});

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const classes = useStyles();

  const numUpdates =
    Object.keys(localSafetyFeatures).length + (localSafetyScore !== undefined ? 1 : 0);
  const numSafetyFeatures = Object.keys(usedSafetyFeatures).length;

  const { enqueueSnackbar } = useSnackbar();

  const safetyFeaturesAndSwitches = Object.entries(safetyFeatures).map(
    ([featureId, { name }], ix) => {
      const currentValue = localSafetyFeatures[featureId];
      const updated = currentValue !== undefined;
      const last = ix === numSafetyFeatures - 1;

      // const onSwitchChange = (_: React.ChangeEvent<unknown>, newValue: boolean) =>
      //   setLocalSafetyFeatures((prevState) => ({ ...prevState, [featureId]: newValue }));

      const radioColor = updated ? "primary" : "secondary";
      const featureScore = usedSafetyFeatures[featureId as SafetyFeatureId];
      const featureEnabled =
        featureScore !== undefined ? featureScore >= SAFETY_FEATURE_THRESHOLD : undefined;
      const radioValue = updated ? currentValue : featureEnabled;

      const onRadioChange = (event: unknown, value: string) => {
        const newValue = value === "true";
        setLocalSafetyFeatures((prevState) => ({ ...prevState, [featureId]: newValue }));
      };

      const onRadioClick = (required: boolean) => () => {
        if (!updated && radioValue === required) {
          onRadioChange(null, `${required}`);
        }
      }

      return (
        <Grid item xs={12} key={featureId} className={classes.gridItem}>
          <div className={classes.safetyItem}>
            <SafetyItem
              feature={featureId as SafetyFeatureId}
              value={usedSafetyFeatures[featureId as SafetyFeatureId]}
            />
          </div>

          <RadioGroup row value={`${radioValue}`} onChange={onRadioChange}>
            <FormControlLabel
              label="Not required"
              value="false"
              labelPlacement="start"
              control={<Radio color={radioColor} onClick={onRadioClick(false)} />}
              style={updated && radioValue === false ? { color: colors.blue1 } : {}}
            />
            <Divider
              flexItem
              variant="fullWidth"
              orientation="vertical"
              style={{ margin: "0 20px" }}
            />
            <FormControlLabel
              label="Required"
              value="true"
              labelPlacement="end"
              control={<Radio color={radioColor} onClick={onRadioClick(true)} />}
              style={updated && radioValue === true ? { color: colors.blue1 } : {}}
            />
          </RadioGroup>

          {smallScreen && !last ? (
            <Divider variant="middle" orientation="horizontal" className={classes.gridDivider} />
          ) : undefined}
        </Grid>
      );
    }
  );

  const onClearClick = () => {
    setLocalSafetyScore(undefined);
    setLocalSafetyFeatures({});
  };

  const onSubmitClick = async () => {
    const safetyScores = Object.entries(localSafetyFeatures).map(([feature, enabled]) => [
      feature,
      enabled ? 100 : 0,
    ]) as [string, 100 | 0][];
    const data = {
      shopId: locationData.id,
      scores: Object.fromEntries(safetyScores),
      rating: localSafetyScore,
      updateLocationData: locationData.updateLocationData,
    };

    const response = ((await updateSafety(data)).data as unknown) as EditResult;

    if (response.success) {
      enqueueSnackbar("Successfully updated safety information.", { variant: "success" });
    } else {
      enqueueSnackbar(`Failed to update. Reason: ${response.reason}`, { variant: "error" });
    }
    onClearClick();
  };

  return (
    <div className={classes.container}>
      <div className={classes.safetyScoreContainer}>
        <SafetyScore
          safetyScore={localSafetyScore ?? safetyScore}
          setSafetyScore={setLocalSafetyScore}
          size={smallScreen ? "medium" : "large"}
          updated={localSafetyScore !== undefined}
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
