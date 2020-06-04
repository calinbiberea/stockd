import React, { useEffect, useMemo, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

let autocompleteService: google.maps.places.AutocompleteService;

const containerStyle = {
  width: 300,
  margin: "16px",
};

const LocationSearch: React.FC = () => {
  const [value, setValue] = useState<google.maps.places.AutocompletePrediction | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: google.maps.places.AutocompletePrediction[]) => void
        ) => {
          autocompleteService.getPlacePredictions(request, callback);
        },
        200
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService && window.google) {
      autocompleteService = new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: google.maps.places.AutocompletePrediction[]) => {
      if (active) {
        let newOptions = [] as google.maps.places.AutocompletePrediction[];

        if (value) {
          newOptions = [value];
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
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      style={containerStyle}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue: google.maps.places.AutocompletePrediction | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
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
