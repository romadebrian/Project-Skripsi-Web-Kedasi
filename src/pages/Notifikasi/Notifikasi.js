// rce
import React, { Component } from "react";
import CreateNotification from "./CreateNotification/CreateNotification";
import ItemNotification from "./props/Notifikasi/ItemNotification";

// menggunakan komponen
var tanggal = " 08 Sep 2021";

class Notifikasi extends Component {
  render() {
    return (
      <div>
        <div className="card-header ">
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#form-notifikasi"
          >
            Buat Pemperitahuan
          </button>
          <div className="card-tools">
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
              {/* Navbar Search */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-widget="navbar-search"
                  href="/"
                  role="button"
                >
                  <i className="fas fa-search" />
                </a>
                <div className="navbar-search-block">
                  <form className="form-inline">
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-navbar"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                          <i className="fas fa-search" />
                        </button>
                        <button
                          className="btn btn-navbar"
                          type="button"
                          data-widget="navbar-search"
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <ItemNotification
          pelanggan="Roma D"
          tanggal={tanggal}
          ruangan="ROOM-003"
          OrderID="PRM-001"
        />
        <ItemNotification
          pelanggan="Debrian"
          tanggal={tanggal}
          ruangan="ROOM-001"
          OrderID="PRM-002"
        />

        <CreateNotification />
      </div>
    );
  }
}

// let chat = (
//   <div>
//     <Notifikasi sender="dian" tanggal={tanggal} content="Hi, Apa kabar?" />
//     <Notifikasi sender="petanikode" tanggal={tanggal} content="Kabar Baik" />
//   </div>
// );

export default Notifikasi;
