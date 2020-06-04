import React, { useEffect, useMemo, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { LocationSearchProps } from "./FilterShopsTypes";
import { getPlacePredictions } from "../../util/googleMaps";

const containerStyle = {
  width: 300,
  margin: "16px",
};

const LocationSearch: React.FC<LocationSearchProps> = ({
  location,
  setLocation,
}: LocationSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: google.maps.places.AutocompletePrediction[]) => void
        ) => {
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

    fetch({ input: inputValue }, (results?: google.maps.places.AutocompletePrediction[]) => {
      if (active) {
        let newOptions = [] as google.maps.places.AutocompletePrediction[];

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
      style={containerStyle}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={location}
      onChange={(event, newValue: google.maps.places.AutocompletePrediction | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setLocation(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Location" variant="outlined" fullWidth />
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
