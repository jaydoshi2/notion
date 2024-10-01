// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMpwJyNGGPAUFiyOP9FPehXMUTdCElBNY",
  authDomain: "notion-clone-58828.firebaseapp.com",
  projectId: "notion-clone-58828",
  storageBucket: "notion-clone-58828.appspot.com",
  messagingSenderId: "895437712438",
  appId: "1:895437712438:web:9a7fbc5a8be6dd088c3c97",
  measurementId: "G-N7L31463NP"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length === 0? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app);

export {db};