import React, { Component, Fragment } from "react";
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
    IDYangLogin: JSON.parse(localStorage.getItem("UserId")),
  };

  handlechange = (params) => {
    this.setState({ text: params.target.value });
  };

  handleEnter = (event) => {
    event.preventDefault();
    // console.log("Enter");
    this.handleSendChat();
  };

  handleSendChat = () => {
    const IDchat = this.props.UID;
    var tanggal = new Date().toUTCString();

    firebase
      .database()
      .ref("chat/" + IDchat)
      .push(
        {
          Nama: this.state.IDYangLogin,
          Waktu: tanggal,
          Pesan: this.state.text,
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
          <h3 className="card-title">{this.props.dataUser[0].nama}</h3>
        </div>
        {/* /.card-header */}
        <div className="card-body">
          {/* Conversations are loaded here */}
          <div className="direct-chat-messages">
            {/* Chat */}

            {this.props.chatData.length > 0 ? (
              <Fragment>
                {this.props.chatData.map((result) => {
                  // console.log(result);

                  console.log(result.data.Nama);
                  console.log(this.state.IDYangLogin);
                  if (result.data.Nama === this.state.IDYangLogin) {
                    return (
                      <ChatFromAdmin
                        key={result.id}
                        nama={this.props.dataAdmin[0].nama}
                        waktu={result.data.Waktu}
                        pesan={result.data.Pesan}
                        photo={this.props.dataAdmin[0].photo}
                      />
                    );
                  } else {
                    return (
                      <ChatFromUser
                        key={result.id}
                        nama={this.props.dataUser[0].nama}
                        waktu={result.data.Waktu}
                        pesan={result.data.Pesan}
                        photo={this.props.dataUser[0].photo}
                      />
                    );
                  }
                })}
              </Fragment>
            ) : null}
            {/* End of Chat */}
          </div>
          {/*/.direct-chat-messages*/}
        </div>

        {/* /.card-body */}
        <div className="card-footer">
          <form onSubmit={this.handleEnter}>
            <div className="input-group">
              <input
                type="text"
                name="message"
                placeholder="Type Message ..."
                className="form-control"
                onChange={(e) => this.handlechange(e)}
                // onKeyPress={this.handleEnter}
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
