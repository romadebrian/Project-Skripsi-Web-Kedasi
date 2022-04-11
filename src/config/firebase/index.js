import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCc5ek9ssBoMX3Qq3lbZmPzPO3-DbabQYU",
  authDomain: "kedasi.firebaseapp.com",
  databaseURL: "https://kedasi-default-rtdb.firebaseio.com",
  projectId: "kedasi",
  storageBucket: "kedasi.appspot.com",
  messagingSenderId: "1005977900028",
  appId: "1:1005977900028:web:5ca8737e2de38ab5085879",
  measurementId: "G-D3857WHYJZ",
};

firebase.initializeApp(firebaseConfig);

export const getAuth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();

export default firebase;
