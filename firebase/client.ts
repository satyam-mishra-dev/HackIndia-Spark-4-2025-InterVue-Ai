// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCSadBJeapdRD4QRRTLiq6suDShzruyt-A",
    authDomain: "intervue-ai-dce59.firebaseapp.com",
    projectId: "intervue-ai-dce59",
    storageBucket: "intervue-ai-dce59.firebasestorage.app",
    messagingSenderId: "19220396748",
    appId: "1:19220396748:web:4fbeafd099b5fdd0ede069",
    measurementId: "G-MC2SW4FDPN"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
