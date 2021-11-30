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
      <>
        <Header />
        <SideNav />

        {/* Konten */}
        <Switch>
          <div className="content-wrapper">
            <Route path="/" exart component={Home} />
            <Route path="/ruangan" exart component={Ruangan} />
            <Route path="/notifikasi" exact component={Notifikasi} />
            <Route path="/pesan" exact component={Pesan} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/detailorder" exact component={DetailOrder} />
            <Route path="/printlaporan" exact component={PrintLaporan} />
          </div>
        </Switch>

        <Footer />
      </>
    </Router>
  );
}

export default App;
