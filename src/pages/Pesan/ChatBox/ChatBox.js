import React, { Component } from "react";
import "./ChatBox.css";
import ChatFromAdmin from "./props/ChatFromAdmin";
import ChatFromUser from "./props/ChatFromUser";

import firebase from "../../../config/firebase";

export default class ChatBox extends Component {
  datanya = {
    dataChat: "",
  };

  state = {
    text: "",
  };

  handlechange = (params) => {
    this.setState({ text: params.target.value });
  };

  handleSendChat = () => {
    const ID = this.props.UID;

    firebase
      .database()
      .ref("chat/" + ID)
      .push(
        {
          UserID: ID,
          Pengirim: "Admin",
          Text: this.state.text,
        },
        (error) => {
          if (error) {
            // The write failed...
            alert("Gagal Simpan");
          } else {
            // Data saved successfully!

            console.log("new chat telah di buat: ");
            // window.location.reload();
          }
        }
      );
  };

  render() {
    return (
      <div className="card col-md-8 direct-chat direct-chat-primary">
        <div className="card-header">
          <h3 className="card-title">{this.props.Nama}</h3>
        </div>
        {/* /.card-header */}
        <div className="card-body">
          {/* Conversations are loaded here */}
          <div className="direct-chat-messages">
            {/* Chat */}
            <ChatFromUser
              nama="Alexander Pierce"
              waktu="23 Jan 2:00 pm"
              pesan="Is this template really for free? That's unbelievable!"
            />

            <ChatFromAdmin
              nama="Roma Debrian"
              waktu="23 Jan 2:05 pm"
              pesan="You better believe it!"
            />

            <ChatFromUser
              nama="Alexander Pierce"
              waktu="23 Jan 5:37 pm"
              pesan="Working with AdminLTE on a great new app! Wanna join?"
            />

            <ChatFromAdmin
              nama="Roma Debrian"
              waktu="23 Jan 6:10 pm"
              pesan="I would love to."
            />
            {/* End of Chat */}
          </div>
          {/*/.direct-chat-messages*/}
          {/* Contacts are loaded here */}
          <div className="direct-chat-contacts">
            <ul className="contacts-list">
              <li>
                <a href="/">
                  <img
                    className="contacts-list-img"
                    src="dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                  />
                  <div className="contacts-list-info">
                    <span className="contacts-list-name">
                      Count Dracula
                      <small className="contacts-list-date float-right">
                        2/28/2015
                      </small>
                    </span>
                    <span className="contacts-list-msg">
                      How have you been? I was...
                    </span>
                  </div>
                  {/* /.contacts-list-info */}
                </a>
              </li>
              {/* End Contact Item */}
              <li>
                <a href="/">
                  <img
                    className="contacts-list-img"
                    src="dist/img/user7-128x128.jpg"
                    alt="User Avatar"
                  />
                  <div className="contacts-list-info">
                    <span className="contacts-list-name">
                      Sarah Doe
                      <small className="contacts-list-date float-right">
                        2/23/2015
                      </small>
                    </span>
                    <span className="contacts-list-msg">
                      I will be waiting for...
                    </span>
                  </div>
                  {/* /.contacts-list-info */}
                </a>
              </li>
              {/* End Contact Item */}
              <li>
                <a href="/">
                  <img
                    className="contacts-list-img"
                    src="dist/img/user3-128x128.jpg"
                    alt="User Avatar"
                  />
                  <div className="contacts-list-info">
                    <span className="contacts-list-name">
                      Nadia Jolie
                      <small className="contacts-list-date float-right">
                        2/20/2015
                      </small>
                    </span>
                    <span className="contacts-list-msg">
                      I'll call you back at...
                    </span>
                  </div>
                  {/* /.contacts-list-info */}
                </a>
              </li>
              {/* End Contact Item */}
              <li>
                <a href="/">
                  <img
                    className="contacts-list-img"
                    src="dist/img/user5-128x128.jpg"
                    alt="User Avatar"
                  />
                  <div className="contacts-list-info">
                    <span className="contacts-list-name">
                      Nora S. Vans
                      <small className="contacts-list-date float-right">
                        2/10/2015
                      </small>
                    </span>
                    <span className="contacts-list-msg">
                      Where is your new...
                    </span>
                  </div>
                  {/* /.contacts-list-info */}
                </a>
              </li>
              {/* End Contact Item */}
              <li>
                <a href="/">
                  <img
                    className="contacts-list-img"
                    src="dist/img/user6-128x128.jpg"
                    alt="User Avatar"
                  />
                  <div className="contacts-list-info">
                    <span className="contacts-list-name">
                      John K.
                      <small className="contacts-list-date float-right">
                        1/27/2015
                      </small>
                    </span>
                    <span className="contacts-list-msg">
                      Can I take a look at...
                    </span>
                  </div>
                  {/* /.contacts-list-info */}
                </a>
              </li>
              {/* End Contact Item */}
              <li>
                <a href="/">
                  <img
                    className="contacts-list-img"
                    src="dist/img/user8-128x128.jpg"
                    alt="User Avatar"
                  />
                  <div className="contacts-list-info">
                    <span className="contacts-list-name">
                      Kenneth M.
                      <small className="contacts-list-date float-right">
                        1/4/2015
                      </small>
                    </span>
                    <span className="contacts-list-msg">
                      Never mind I found...
                    </span>
                  </div>
                  {/* /.contacts-list-info */}
                </a>
              </li>
              {/* End Contact Item */}
            </ul>
            {/* /.contacts-list */}
          </div>
          {/* /.direct-chat-pane */}
        </div>
        {/* /.card-body */}
        <div className="card-footer">
          <form action="#" method="post">
            <div className="input-group">
              <input
                type="text"
                name="message"
                placeholder="Type Message ..."
                className="form-control"
                onChange={(e) => this.handlechange(e)}
              />
              <span className="input-group-append">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => this.handleSendChat(e)}
                >
                  Send
                </button>
              </span>
            </div>
          </form>
        </div>
        {/* /.card-footer*/}
      </div>
    );
  }
}
