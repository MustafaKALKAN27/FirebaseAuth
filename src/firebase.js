import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile, updatePassword, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";

const firebaseConfig = {
  apiKey: "***",
  authDomain: "authentication-fde47.firebaseapp.com",
  projectId: "authentication-fde47",
  storageBucket: "authentication-fde47.appspot.com",
  messagingSenderId: "16751577508",
  appId: "1:16751577508:web:eaffabd7ed64befada9931",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil Güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const resetPassword = async password => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Parola Güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};


export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `Doğrulama maili ${auth.currentUser.email} adresine gönderildi, lütfen kontrol ediniz.`
    );
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {




    store.dispatch(loginHandle({
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      uid: user.uid

    }));
  } else {
    store.dispatch(logoutHandle());
  }
});
export default app;
