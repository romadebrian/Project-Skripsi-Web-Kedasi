import React from "react";

function ChatFromAdmin(props) {
  return (
    <div className="direct-chat-msg right">
      <div className="direct-chat-infos clearfix">
        <span className="direct-chat-name float-right">{props.nama}</span>
        <span className="direct-chat-timestamp float-left">{props.waktu}</span>
      </div>
      {/* /.direct-chat-infos */}
      <img
        className="direct-chat-img"
        src="dist/img/romadebrian.png"
        alt="message-user-images"
      />
      {/* /.direct-chat-img */}
      <div className="direct-chat-text">{props.pesan}</div>
      {/* /.direct-chat-text */}
    </div>
  );
}

export default ChatFromAdmin;