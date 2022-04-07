import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import { createContext, useContext, useEffect, useState } from "react";

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

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState("loading");
  // const [error, setError] = useState(null);
  console.log("datauser firebase", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth, setUser);
    return () => unsubscribe;
  }, []);

  return <AuthContext.Provider value={user} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  // console.log("test", auth);

  return { ...auth, isAuthenticated: auth != null };
};

export const DataCurrentUser = () => {
  const dataUser = useContext(AuthContext);
  console.log("test", dataUser);

  return { dataUser };
};
