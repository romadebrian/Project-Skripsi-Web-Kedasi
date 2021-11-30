import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import $ from "jquery";
import Header from "./component/Header/Header";
import SideNav from "./component/SideNav/SideNav";
import Footer from "./component/Footer/Footer";

import Home from "./pages/Home/Home";
import Ruangan from "./pages/Ruangan/Ruangan";
import Notifikasi from "./pages/Notifikasi/Notifikasi";
import Pesan from "./pages/Pesan/Pesan";
import Profile from "./pages/Profile/Profile";

import DetailOrder from "./pages/Ruangan/props/Ruangan/DetailOrder";
import PrintLaporan from "./pages/Ruangan/props/Ruangan/PrintLaporan";

// Fungsi untuk yang di tampilkan ke index.html
function App() {
  return (
    <Router>
      <div>
        <Header />
        <SideNav />

        {/* Konten */}
        <div className="content-wrapper">
          <Switch>
            <Route path="/ruangan">
              <Ruangan />
            </Route>
            <Route path="/notifikasi">
              <Notifikasi />
            </Route>
            <Route path="/pesan">
              <Pesan />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/detailorder">
              <DetailOrder />
            </Route>
            <Route path="/printlaporan">
              <PrintLaporan />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
