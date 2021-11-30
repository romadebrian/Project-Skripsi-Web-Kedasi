// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc5ek9ssBoMX3Qq3lbZmPzPO3-DbabQYU",
  authDomain: "kedasi.firebaseapp.com",
  projectId: "kedasi",
  storageBucket: "kedasi.appspot.com",
  messagingSenderId: "1005977900028",
  appId: "1:1005977900028:web:5ca8737e2de38ab5085879",
  measurementId: "G-D3857WHYJZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
