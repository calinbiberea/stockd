import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

type NotifyFunc = (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;

export const getCurrentLocation = (notify?: NotifyFunc): Promise<Position | null> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (notify !== undefined) {
          notify("Successfully got your location", { variant: "success" });
        }
        resolve(position);
      },
      () => {
        if (notify !== undefined) {
          notify("Failed to get your location", { variant: "error" });
        }
        resolve(null);
      }
    );
  });
