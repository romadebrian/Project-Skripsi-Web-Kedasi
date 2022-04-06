import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Navigate,
} from "react-router-dom";
import { connect } from "react-redux";
// import $ from "jquery";

// import Footer from "./modules/Main/Footer/Footer";
import Main from "./modules/Main/main";
import Login from "./modules/Login/Login";
import LupaPassword from "./modules/Login/LupaPassword/LupaPassword";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <Route path="/lupa_password">
          <LupaPassword />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>

      {/* <Footer /> */}
    </Router>
  );
}

let usernya = null;

const mapStateToProps = (state) => {
  // console.log("log global state", state);
  usernya = state;

  return state;
};

function PrivateRoute({ children }) {
  let IsLogin = usernya.user != null;
  let location = useLocation();

  console.log("IsLogin:", IsLogin);
  if (!IsLogin) {
    alert("you are not logged in");
    return <Link to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default connect(mapStateToProps)(App);
