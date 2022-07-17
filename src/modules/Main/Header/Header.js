import React, { Fragment } from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../../config/firebase";

// rafce (react)

class Header extends Component {
  state = {
    listNotifikasi: [],
    listHistoryChat: [],
    totalUnreadNotification: 0,
  };

  componentDidMount() {
    this.handleGetDataNotification();
    this.getListPrimarykeyUserWasChat();
  }

  componentDidUpdate() {}

  getDeferentTime = (tanggal) => {
    var date1 = new Date(tanggal);
    var date2 = new Date();

    var Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Minute = Math.round(Difference_In_Time / (1000 * 60));

    var Difference_In_Hours = Math.round(Difference_In_Time / (1000 * 3600));

    var Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );

    // console.log("Tanggal Notifikasi", date1);
    // console.log("Tanggal Sekarang", date2);

    if (Difference_In_Minute <= 60) {
      // console.log("Deferent Minute", Difference_In_Minute);
      return Difference_In_Minute + " Minute";
    } else if (Difference_In_Hours <= 24) {
      // console.log("Deferent Hours", Difference_In_Hours);
      return Difference_In_Hours + " Hours";
    } else {
      // console.log("Deferent Days", Difference_In_Days);
      return Difference_In_Days + " Days";
    }
  };

  //
  // Function for Notification
  //

  handleGetDataNotification = () => {
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

        this.setState({ listNotifikasi: data }, () => {
          this.getDeferentTime();
          this.getTotalUnreadNotification();
        });

        // console.log("List Notification in header: ", this.state.listNotifikasi);
      });
  };

  getTotalUnreadNotification = () => {
    let totalUnread = 0;
    let totalNotifikasi = this.state.listNotifikasi.length;

    const checkUnread = (i) => {
      if (this.state.listNotifikasi[i].data.Status === "Unread") {
        totalUnread = totalUnread + 1;
        this.setState({ totalUnreadNotification: totalUnread });
        // console.log("total", totalUnread);
      }
    };

    let i = 0;
    do {
      checkUnread(i);
      i++;
    } while (i < totalNotifikasi);
  };

  //
  // Function for live chat
  //

  getListPrimarykeyUserWasChat = () => {
    firebase
      .database()
      .ref("/chat/")
      .on("value", (snapshot) => {
        const data = [];
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((key) => {
            data.push({
              id: key,
            });
            // console.log(key);
            return data;
          });
        } else {
          console.log("tidak chat");
        }

        this.setState({ listHistoryChat: data }, () => {
          this.handleHistoryChat();
        });
        // console.log("history chat: ", this.state.listHistoryChat);
      });
  };

  handleHistoryChat = async () => {
    // deklarasi variable harus sama dengan di state
    const listHistoryChat = [];

    if (this.state.listHistoryChat.length > 0) {
      this.state.listHistoryChat.map(async (chat) => {
        // console.log("susun data id", chat.id);

        // Get User Info from table user based on user prymary key in list history chat
        const dataUser = await this.dataUserForHistoryChat(chat.id);
        // Get data Last Chat based on user primary key in list history chat
        const LastChatData = await this.dataLastChat(chat.id);

        let namaUser = dataUser[0].nama;
        let photoUser = dataUser[0].photo;

        let tanggal = LastChatData[0].tanggal;
        let lastChat = LastChatData[0].lastChat;

        // console.log("ambil data chat", dataLastChat);

        listHistoryChat.push({
          id: chat.id,
          nama: namaUser,
          photo: photoUser,
          tanggalLastChat: tanggal,
          lastChat: lastChat,
        });

        this.setState({ listHistoryChat }, () => {
          // console.log("hasil susun data last chat", this.state.listHistoryChat);
        });
        // return listHistoryChat;
      });
    } else {
      console.log("data kosong");
    }
    // console.log("data history chat =", this.state.listHistoryChat);
  };

  dataUserForHistoryChat = (ID) => {
    const dataUserNya = [];

    return new Promise((resolve) => {
      firebase
        .database()
        .ref("/users/" + ID)
        .on("value", (snapshot) => {
          // const dataUserNya = [];
          dataUserNya.push({
            nama: snapshot.val() && snapshot.val().Nama,
            photo: snapshot.val() && snapshot.val().Profile_Picture,
          });
          // console.log(snapshot.val());
          // return dataUserNya;
          resolve(dataUserNya);
        });
    });

    // return dataUserNya;
  };

  dataLastChat = (ID) => {
    const dataChatNya = [];
    // const ID = "Q6oONNZcYTawpMtsrv6CsTa2uz43";
    return new Promise((resolve) => {
      firebase
        .database()
        .ref("/chat/" + ID)
        .limitToLast(1)
        .on("value", (snapshot) => {
          // console.log("Data last chat", snapshot.val());

          Object.keys(snapshot.val()).map((key) => {
            dataChatNya.push({
              // id: key,
              // data: snapshot.val()[key],

              lastChat: snapshot.val() && snapshot.val()[key].Pesan,
              tanggal: snapshot.val() && snapshot.val()[key].Waktu,
            });
            // console.log(dataChatNya);

            return dataChatNya;
          });

          // return dataUserNya;
          resolve(dataChatNya);
        });
    });
  };

  render() {
    return (
      <div>
        {/* Navbar */}
        {/* ////// */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                data-widget="pushmenu"
                to="#"
                role="button"
              >
                <i className="fas fa-bars" />
              </Link>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Messages Dropdown Menu */}
            <li className="nav-item dropdown">
              <Link className="nav-link" data-toggle="dropdown" to="#">
                <i className="far fa-comments" />

                {/* <span className="badge badge-danger navbar-badge">3</span> */}
              </Link>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                {this.state.listHistoryChat.length > 0 ? (
                  <Fragment>
                    {this.state.listHistoryChat.map((chat) => {
                      const elapsedTimeChat = this.getDeferentTime(
                        chat.tanggalLastChat
                      );

                      return (
                        <Fragment key={chat.id}>
                          <Link to="/pesan" className="dropdown-item">
                            {/* Message Start */}
                            <div className="media">
                              <img
                                src={chat.photo}
                                alt="User Avatar"
                                className="img-size-50 img-circle mr-3"
                                style={{ height: "50px" }}
                              />
                              <div className="media-body">
                                <h3 className="dropdown-item-title">
                                  {chat.nama}
                                  <span className="float-right text-sm text-muted"></span>
                                </h3>
                                <p className="text-sm">{chat.lastChat}</p>
                                <p className="text-sm text-muted">
                                  <i className="far fa-clock mr-1" />
                                  {elapsedTimeChat}
                                </p>
                              </div>
                            </div>
                            {/* Message End */}
                          </Link>
                          <div className="dropdown-divider" />
                        </Fragment>
                      );
                    })}
                  </Fragment>
                ) : null}

                <Link to="/pesan" className="dropdown-item dropdown-footer">
                  See All Messages
                </Link>
              </div>
            </li>

            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="/">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">
                  {this.state.totalUnreadNotification > 0
                    ? this.state.totalUnreadNotification
                    : null}
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">
                  {this.state.listNotifikasi.length} Notifications
                </span>

                {this.state.listNotifikasi.length > 0 ? (
                  <Fragment>
                    {this.state.listNotifikasi.map((result) => {
                      // console.log(result.id);
                      const elapsedTime = this.getDeferentTime(
                        result.data.waktu
                      );
                      return (
                        <Fragment key={result.id}>
                          <div className="dropdown-divider" />
                          <Link
                            to="/notifikasi"
                            className="dropdown-item text-truncate"
                          >
                            {/* <i className="fas fa-circle text-light mr-2" /> */}
                            {result.data.Status !== "Read" ? (
                              <i className="fa fa-circle text-success mr-2"></i>
                            ) : (
                              <i className="fas fa-circle text-light mr-2" />
                            )}
                            {result.data.Judul}
                            <span className="float-right text-muted text-sm">
                              {elapsedTime}
                            </span>
                          </Link>
                        </Fragment>
                      );
                    })}
                  </Fragment>
                ) : null}

                <div className="dropdown-divider" />
                <Link
                  to="/notifikasi"
                  className="dropdown-item dropdown-footer"
                >
                  See All Notifications
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                data-widget="fullscreen"
                to="#"
                role="button"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-expand-arrows-alt" />
              </Link>
            </li>
          </ul>
        </nav>
        {/* End Of Navbar */}
      </div>
    );
  }
}

export default Header;
