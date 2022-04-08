import React, { useState } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth } from "../../../config/firebase";
import "./SideNav.css";

function SideNav(props) {
  let location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  React.useEffect(() => {
    // console.log("lokasi", currentPage);
    if (location.pathname === "/ruangan") {
      console.log("page ruangan");
      setCurrentPage("ruangan");
    } else if (location.pathname === "/notifikasi") {
      console.log("page Notifikasi");
      setCurrentPage("notifikasi");
    } else if (location.pathname === "/pesan") {
      console.log("page pesan");
      setCurrentPage("pesan");
    } else {
      setCurrentPage("");
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("UserId");
    localStorage.removeItem("UserEmail");

    getAuth.signOut();
    // this.props.history.push("/login");
    // window.location.reload();
  };

  return (
    <div>
      {/* Main Sidebar Container */}
      {/* ////////////////////// */}
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4 menu-samping"
        // style={{ backgroundColor: "#664130" }}
      >
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img
            src="dist/img/logo-header.png"
            alt="AdminLTE-Logo"
            className="brand-image "
            // style={{ opacity: ".8"}}
          />
          <br />
          {/* <span className="brand-text font-weight-light"> Kedasi </span> */}
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/romadebrian.png"
                className="img-circle elevation-2"
                alt="User_Image"
              />
            </div>
            <div className="info">
              <Link to="/profile" className="d-block">
                Roma Debrian
              </Link>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class with font-awesome or any other icon font library */}
              <li className="nav-item">
                {/*className="nav-link active"> */}
                <Link
                  to="/ruangan"
                  className={`nav-link ${
                    currentPage === "ruangan" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fas fa-book" />
                  <p>Reservasi Ruangan</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/notifikasi"
                  className={`nav-link ${
                    currentPage === "notifikasi" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fas fa-bell" />
                  <p>Notifikasi</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/pesan"
                  className={`nav-link ${
                    currentPage === "pesan" ? "active" : ""
                  }`}
                >
                  <i className="nav-icon fas fa-inbox" />
                  <p>Pesan</p>
                </Link>
              </li>
              <li className="nav-item" onClick={handleLogout}>
                <Link to="/logout" className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt" />
                  <p>Logout</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      {/* End Of Side Bar */}
    </div>
  );
}

export default withRouter(SideNav);
