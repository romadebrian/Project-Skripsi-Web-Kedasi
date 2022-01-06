import React from "react";

function ItemUserChat() {
  return (
    <a
      href="/"
      className="list-group-item list-group-item-action py-3 lh-tight" //active
      aria-current="true"
      style={{ paddingLeft: "10px" }}
    >
      <div className="row align-items-center">
        <div className="col-2">
          <img
            className="direct-chat-img"
            src="dist/img/user2-160x160.jpg"
            alt="message_users_image"
          />
        </div>
        <div className="col-10">
          <div className="d-flex w-100 align-items-center justify-content-between">
            <strong>List group item heading</strong>
            <small>Wed</small>
          </div>
          <div className="mb-1 small" style={{ marginRight: "20px" }}>
            Some placeholder content in a paragraph below the heading and date.
          </div>
        </div>
      </div>
    </a>
  );
}

export default ItemUserChat;