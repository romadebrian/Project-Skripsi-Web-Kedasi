// rce
import React, { Component, Fragment } from "react";
import CreateNotification from "./CreateNotification/CreateNotification";
import ItemNotification from "./props/ItemNotification";
import firebase from "../../config/firebase";
import DetailNotification from "./props/DetailNotification";

class Notifikasi extends Component {
  state = {
    dataNotifikasi: "",
    dataDetail: "",
  };

  componentDidMount() {
    this.handleGetData();
  }

  handleGetData = () => {
    return firebase
      .database()
      .ref("/notifikasi/")
      .on("value", (snapshot) => {
        const data = [];
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((key) => {
            data.push({
              id: key,
              data: snapshot.val()[key],
            });
            return data;
          });
        } else {
          console.log("Data tidak ditemukan");
        }

        this.setState({ dataNotifikasi: data });

        console.log("List Notification: ", this.state.dataNotifikasi);
      });
  };

  setNewJudul = (params) => {
    // console.log("params", params);
    this.setState({ dataDetail: params });
  };

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

        {this.state.dataNotifikasi.length > 0 ? (
          <Fragment>
            {this.state.dataNotifikasi.map((result) => {
              // console.log(result.id);
              return (
                <ItemNotification
                  key={result.id}
                  primaryKey={result.id}
                  tanggal="30-01-2021"
                  judul={result.data.Judul}
                  isi={result.data.Isi}
                  pelanggan={result.data.Target}
                  aksi={result.data.Aksi}
                  status={result.data.Status}
                  sendData={(e) => this.setNewJudul(e)}
                />
              );
            })}
          </Fragment>
        ) : null}

        <CreateNotification />
        <DetailNotification dataDetail={this.state.dataDetail} />
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
