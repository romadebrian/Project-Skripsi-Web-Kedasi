import React from "react";

function ChatFromUser(props) {
  return (
    <div className="direct-chat-msg">
      <div className="direct-chat-infos clearfix">
        <span className="direct-chat-name float-left">{props.nama}</span>
        <span className="direct-chat-timestamp float-right">{props.waktu}</span>
      </div>
      {/* /.direct-chat-infos */}
      <img
        className="direct-chat-img"
        // src="dist/img/user2-160x160.jpg"
        src={props.photo}
        alt="MessageAdminImage"
      />
      {/* /.direct-chat-img */}
      <div className="direct-chat-text">{props.pesan}</div>
      {/* /.direct-chat-text */}
    </div>
  );
}

export default ChatFromUser;
