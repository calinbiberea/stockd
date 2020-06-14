import React, { useEffect, useMemo, useState } from "react";
import { TextField, Grid, Typography, makeStyles, createStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import throttle from "lodash/throttle";
import parse from "autosuggest-highlight/parse";
import { getPlacePredictions } from "../../util/googleMaps";
import { LocationSearchProps } from "./FilterShopsTypes";

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "300px",
      margin: "16px",
    },
  })
);

const LocationSearch: React.FC<LocationSearchProps> = ({
  enabled = true,
  location,
  setLocation,
}: LocationSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<AutocompletePrediction[]>([]);

  const classes = useStyles();

  const fetch = useMemo(
    () =>
      throttle(
        (request: { input: string }, callback: (results?: AutocompletePrediction[]) => void) => {
          getPlacePredictions(request, callback);
        },
        200
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(location ? [location] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: AutocompletePrediction[]) => {
      if (active) {
        let newOptions = [] as AutocompletePrediction[];

        if (location) {
          newOptions = [location];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [location, inputValue, fetch]);

  return (
    <Autocomplete
      className={classes.container}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={location}
      disabled={!enabled}
      onChange={(event, newValue: AutocompletePrediction | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setLocation(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Location" variant="outlined" fullWidth disabled={!enabled} />
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon />
            </Grid>

            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default LocationSearch;
