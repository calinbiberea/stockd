const varName = "REACT_APP_GOOGLE_MAPS_API_KEY";

export const apiKey = process.env[varName];

export const checkAPIKey = () => {
  if (!apiKey) {
    throw new Error(`'${varName}' missing from environment vars!`);
  }
};
