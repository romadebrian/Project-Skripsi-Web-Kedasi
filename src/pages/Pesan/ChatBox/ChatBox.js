import React, { Fragment, useState } from "react";
import "./ChatBox.css";
import ChatFromAdmin from "./props/ChatFromAdmin";
import ChatFromUser from "./props/ChatFromUser";

import firebase from "../../../config/firebase";
import { FormattingDateTime } from "../../../config/formattingDateTime";

export default function ChatBox(props) {
  // datanya = {
  //   dataChat: "",
  // };

  // state = {
  //   text: "",
  //   userId: JSON.parse(localStorage.getItem("UserId")),
  // };

  const [userId] = useState(JSON.parse(localStorage.getItem("UserId")));
  const [message, setMessage] = useState("");

  // const handleEnter = (event) => {
  //   event.preventDefault();
  //   // console.log("Enter");
  //   handleSendChat();
  // };

  const handleSendChat = (event) => {
    event.preventDefault();

    const IDchat = props.UID;
    var DateTimeNow = FormattingDateTime(new Date());

    firebase
      .database()
      .ref("chat/" + IDchat)
      .push(
        {
          IDUser: userId,
          Pesan: message,
          Waktu: DateTimeNow,
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

  return (
    <div className="card col-md-8 direct-chat direct-chat-primary">
      <div className="card-header">
        <h3 className="card-title">{props.dataUser[0].nama}</h3>
      </div>
      {/* /.card-header */}
      <div className="card-body">
        {/* Conversations are loaded here */}
        <div className="direct-chat-messages">
          {/* Chat */}

          {props.chatData.length > 0 ? (
            <Fragment>
              {props.chatData.map((result) => {
                console.log(props);

                console.log(result);
                console.log(userId);
                if (result.data.IDUser === userId) {
                  return (
                    <ChatFromAdmin
                      key={result.id}
                      nama={props.dataAdmin[0].nama}
                      waktu={result.data.Waktu}
                      pesan={result.data.Pesan}
                      photo={props.dataAdmin[0].photo}
                    />
                  );
                } else {
                  return (
                    <ChatFromUser
                      key={result.id}
                      nama={props.dataUser[0].nama}
                      waktu={result.data.Waktu}
                      pesan={result.data.Pesan}
                      photo={props.dataUser[0].photo}
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
        <form onSubmit={handleSendChat}>
          <div className="input-group">
            <input
              type="text"
              name="message"
              placeholder="Type Message ..."
              className="form-control"
              onChange={({ target }) => setMessage(target.value)}
              // onKeyPress={handleEnter}
            />
            <span className="input-group-append">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleSendChat(e)}
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
