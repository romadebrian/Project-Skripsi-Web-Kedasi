import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import $ from "jquery";

// import Footer from "./modules/Main/Footer/Footer";
import Main from "./modules/Main/main";
import Login from "./modules/Login/Login";
import LupaPassword from "./modules/Login/LupaPassword/LupaPassword";
import { AuthContextProvider, useAuthState } from "./config/firebase";

// const PrivateRoute = ({ component: C, ...props }) => {
//   const { isAuthenticated } = useAuthState();
//   console.log(isAuthenticated);
//   return (
//     <Route
//       {...props}
//       render={(routeProps) =>
//         isAuthenticated ? (
//           <C {...routeProps} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//             }}
//           />
//         )
//       }
//     />
//   );
// };

function App() {
  return (
    <AuthContextProvider>
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/lupa_password">
            <LupaPassword />
          </Route>
          <PrivateRoute path="/">
            <Main />
          </PrivateRoute>
        </Switch>

        {/* <Footer /> */}
      </Router>
    </AuthContextProvider>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuthState();
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
