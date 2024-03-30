// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHifU6m3ty-yMocaEjBjaLeaB6XDfu--w",
  authDomain: "wherenext-0000.firebaseapp.com",
  projectId: "wherenext-0000",
  storageBucket: "wherenext-0000.appspot.com",
  messagingSenderId: "737457172184",
  appId: "1:737457172184:web:0e9b3eb3411a66e3a2f1ad",
  measurementId: "G-PCT4HDGWMK",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
  size: "invisible",
  callback: (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  },
});
