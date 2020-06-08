import firebase from "firebase";
import { authProviders } from "./firebaseApp";
import { NotifyFunc } from "../util/types";

export const logIn = async (
  provider: keyof typeof authProviders,
  notify?: NotifyFunc
): Promise<string | null> => {
  let uid: string | null;
  try {
    const result = await firebase.auth().signInWithPopup(authProviders[provider]);
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
