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

// import DetailOrder from "../../pages/Ruangan/DetailOrder/DetailOrder";
import PrintLaporan from "../../pages/Ruangan/props/Ruangan/PrintLaporan";
import PesanRuangan from "../../pages/Ruangan/PesanRuangan/PesanRuangan";
import PesanRuanganV2 from "../../pages/Ruangan/PesanRuangan/PesanRuanganV2";

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
              {/* <Route path="/detailorder">
                <DetailOrder />
              </Route> */}
              <Route path="/printlaporan">
                <PrintLaporan />
              </Route>

              <Route path="/formInput">
                <PesanRuangan />
              </Route>
              <Route path="/formInput2">
                <PesanRuanganV2 />
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
