import React from "react";
import ChatBox from "./ChatBox/ChatBox";
import "./Pesan.css";
import ItemUserChat from "./props/ItemUserChat";
function Pesan() {
  return (
    <div className="chatbox">
      {/* List User Who Messege You */}
      <div
        className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
        // style={{ width: 380, height: 640 }}
      >
        <a
          href="/"
          className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
        >
          <span className="fs-5 fw-semibold">List User</span>
        </a>
        <div className="list-group list-group-flush border-bottom scrollarea">
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
          <ItemUserChat />
        </div>
      </div>

      {/* End Part List User Who Messege You */}

      {/* Chat Box */}
      <ChatBox />
      {/* End of Chat Box */}
    </div>
  );
}

export default Pesan;
