const varName = "FIREBASE_API_KEY";

export const firebaseApiKey = process.env[varName];

export const checkAPIKey: () => void = () => {
  if (!firebaseApiKey) {
    throw new Error(`'${varName}' missing from environment vars!`);
  }
};
