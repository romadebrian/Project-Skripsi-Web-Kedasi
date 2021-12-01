import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import $ from "jquery";

import Footer from "./modules/Main/Footer/Footer";
import Main from "./modules/Main/main";
import Login from "./modules/Login/Login";

function App() {
  return (
    <Router>
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
