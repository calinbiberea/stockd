import { NotifyFunc } from "../util/types";
import { auth, authProviders } from "./firebaseApp";

export type Provider = keyof typeof authProviders;

export const logIn = async (provider: Provider, notify?: NotifyFunc): Promise<string | null> => {
  let uid: string | null;
  try {
    const result = await auth.signInWithPopup(authProviders[provider]);
    uid = result.user?.uid || null;
  } catch (e) {
    console.error(e.message);
    uid = null;
  }
  if (notify !== undefined) {
    if (uid !== null) {
      notify("Logged in successfully", { variant: "success" });
    } else {
      notify("Failed to log in", { variant: "error" });
    }
  }
  return uid;
};
