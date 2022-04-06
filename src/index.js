import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "./config/firebase";
import firebase from "./config/firebase";
import { storeRedux } from "./config/redux/redux";
import { Provider } from "react-redux";
// import appFirebase from "./config/firebase";

getAuth.onAuthStateChanged((currentUser) => {
  storeRedux.dispatch({ type: "SET_USER", userData: currentUser });
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={storeRedux}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
