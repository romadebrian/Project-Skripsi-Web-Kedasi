import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import $ from "jquery";

// import Footer from "./modules/Main/Footer/Footer";
import Main from "./modules/Main/main";
import Login from "./modules/Login/Login";

function App() {
  return (
    <Router>
      {/* Preloader */}
      <div className="preloader flex-column justify-content-center align-items-center">
        <img
          className="animation__shake"
          src="/dist/img/kedasi logo.jpg"
          alt="AdminLTELogo"
          height={60}
          width={60}
        />
      </div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
