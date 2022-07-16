import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
// import $ from "jquery";
import Header from "./Header/Header";
import SideNav from "./SideNav/SideNav";
import Footer from "./Footer/Footer";

import Home from "../../pages/Home/Home";
import Ruangan from "../../pages/Ruangan/Ruangan";
import Notifikasi from "../../pages/Notifikasi/Notifikasi";
import Pesan from "../../pages/Pesan/Pesan";
import Profile from "../../pages/Profile/Profile";

import Invoice from "../../pages/Ruangan/DetailOrder/Invoice";
import InvoicePrint from "../../pages/Ruangan/DetailOrder/InvoicePrint";
// import PrintLaporan from "../../pages/Ruangan/props/Ruangan/PrintLaporan";

// Fungsi untuk yang di tampilkan ke index.html
function App(props) {
  // const history = useHistory();

  // useEffect(() => {
  //   // const navigate = useNavigate();

  //   const token = localStorage.getItem("UserId");
  //   if (!token) {
  //     props.history.push("/login");
  //     // navigate("/login");
  //   }
  // });

  return (
    <Router>
      <div className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Header />
          <SideNav />

          {/* Konten */}
          <div className="content-wrapper">
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/ruangan">
                <Ruangan />
              </Route>
              <Route path="/notifikasi">
                <Notifikasi />
              </Route>
              <Route path="/pesan">
                <Pesan />
              </Route>
              {/* <Route path="/logout">
                <Pesan />
              </Route> */}
              <Route path="/invoice">
                <Invoice />
              </Route>
              <Route path="/invoice-print">
                <InvoicePrint />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default withRouter(App);
