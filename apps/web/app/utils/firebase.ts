// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmUIj3IZLTx6_9gSH6Jj7S01R15KTDvRE",
  authDomain: "viraj-f1726.firebaseapp.com",
  projectId: "viraj-f1726",
  storageBucket: "viraj-f1726.firebasestorage.app",
  messagingSenderId: "172130692498",
  appId: "1:172130692498:web:4a29c546ca7c268be1a54b",
  measurementId: "G-JCGLQWP439"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyBF3CNJpALxVjNKEpMTSJavLo_6gZsLsVg",
//   authDomain: "viraj-721e7.firebaseapp.com",
//   projectId: "viraj-721e7",
//   storageBucket: "viraj-721e7.firebasestorage.app",
//   messagingSenderId: "103118539459",
//   appId: "1:103118539459:web:a5eeab8e89aa753305b076",
//   measurementId: "G-272MSMX96S"
// };


// Initialize Firebase
const app = getApps().length === 0 ?  initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export{auth}