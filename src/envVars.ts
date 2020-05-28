const value = undefined as string | undefined;

const varOf = (name: string) => ({ name, value });

const vars = {
  googleMapsKey: varOf("REACT_APP_GOOGLE_MAPS_API_KEY"),
  firebaseKey: varOf("FIREBASE_API_KEY"),
};

Object.values(vars).forEach((v) => {
  v.value = process.env[v.name];
});

export const missingEnvVars: () => string[] = () =>
  Object.values(vars)
    .filter(({ value }) => value)
    .map(({ name }) => name);

export default { missingEnvVars, ...vars };
