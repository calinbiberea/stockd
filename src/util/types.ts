import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

export type NotifyFunc = (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
