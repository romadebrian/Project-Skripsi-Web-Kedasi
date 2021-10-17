import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import $ from "jquery";
import Header from "./component/Header";
import SideNav from "./component/SideNav";
import Footer from "./component/Footer";

import Home from "./component/Home";
import Ruangan from "./component/pages/Ruangan";
import Notifikasi from "./component/pages/Notifikasi";
import Pesan from "./component/pages/Pesan";
import Profile from "./component/pages/Profile";

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
          </div>
        </Switch>

        <Footer />
      </>
    </Router>
  );
}

export default App;
