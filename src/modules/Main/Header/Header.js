import React from "react";
import { Component } from "react";
import firebase from "../../../config/firebase";

// rafce (react)
class Header extends Component {
  state = {
    dataNotifikasi: "",
    dataDetail: "",
  };

  componentDidMount() {
    this.handleGetDataNotification();

    this.getDeferentTime();
  }

  componentDidUpdate() {
    console.log("header log", this.state.dataNotifikasi);
  }

  handleFullScreen = (e) => {
    e.preventDefault();
  };

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

        this.setState({ dataNotifikasi: data });

        console.log("List Notification in header: ", this.state.dataNotifikasi);
      });
  };

  getDeferentTime = () => {
    var date1 = new Date("06/30/2019");
    var date2 = new Date("07/30/2019");

    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    console.log("Deferent Time", Difference_In_Days);
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
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="/"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Messages Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="/">
                <i className="far fa-comments" />
                <span className="badge badge-danger navbar-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="/" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="dist/img/user2-160x160.jpg"
                      alt="User Avatar"
                      className="img-size-50 mr-3 img-circle"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-right text-sm text-danger">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="/" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="/dist/img/romadebrian.png"
                      alt="User Avatar"
                      className="img-size-50 img-circle mr-3"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-right text-sm text-muted">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="/" className="dropdown-item">
                  {/* Message Start */}
                  <div className="media">
                    <img
                      src="dist/img/user2-160x160.jpg"
                      alt="User Avatar"
                      className="img-size-50 img-circle mr-3"
                    />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-right text-sm text-warning">
                          <i className="fas fa-star" />
                        </span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted">
                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                      </p>
                    </div>
                  </div>
                  {/* Message End */}
                </a>
                <div className="dropdown-divider" />
                <a href="/" className="dropdown-item dropdown-footer">
                  See All Messages
                </a>
              </div>
            </li>

            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="/">
                <i className="far fa-bell" />
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">
                  15 Notifications
                </span>

                <div className="dropdown-divider" />
                <a href="/" className="dropdown-item">
                  <i className="fas fa-circle text-success mr-2" />
                  Seseorang memesan ruangan 005
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>

                <div className="dropdown-divider" />
                <a href="/" className="dropdown-item text-truncate">
                  <i className="fas fa-circle text-success mr-2" />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque arcu urna, pharetra a leo non, venenatis accumsan
                  nibh. Duis ac feugiat magna.
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>

                <div className="dropdown-divider" />
                <a href="/" className="dropdown-item">
                  <i className="fas fa-file mr-2" /> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>

                <div className="dropdown-divider" />
                <a href="/" className="dropdown-item dropdown-footer">
                  See All Notifications
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="fullscreen"
                href="/"
                role="button"
                onClick={this.handleFullScreen}
              >
                <i className="fas fa-expand-arrows-alt" />
              </a>
            </li>
          </ul>
        </nav>
        {/* End Of Navbar */}
      </div>
    );
  }
}

export default Header;
