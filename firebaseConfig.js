// Import the functions you need from the SDKs you need
import { initializeApp,getApp, } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbM8uPQtg1T4SjoTq4b5k3siQFOeRAzto",
  authDomain: "wherenext-24624.firebaseapp.com",
  projectId: "wherenext-24624",
  storageBucket: "wherenext-24624.appspot.com",
  messagingSenderId: "351250476175",
  appId: "1:351250476175:web:f443bc1c68a1082da994fa"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

const fbApp =getApp();
const fbStorage = getStorage();
export {fbApp,fbStorage};
