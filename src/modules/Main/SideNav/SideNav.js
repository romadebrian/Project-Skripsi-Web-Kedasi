import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNav extends Component {
  render() {
    return (
      <div>
        {/* Main Sidebar Container */}
        {/* ////////////////////// */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link to="/" className="brand-link">
            <img
              src="dist/img/kedasi logo.jpg"
              alt="AdminLTE-Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light"> Kedasi </span>
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
                  <Link to="/ruangan" className="nav-link active">
                    <i className="nav-icon fas fa-book" />
                    <p>Reservasi Ruangan</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/notifikasi" className="nav-link">
                    <i className="nav-icon fas fa-bell" />
                    <p>Notifikasi</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pesan" className="nav-link">
                    <i className="nav-icon fas fa-inbox" />
                    <p>Pesan</p>
                  </Link>
                </li>
                <li className="nav-item">
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
}

export default SideNav;
