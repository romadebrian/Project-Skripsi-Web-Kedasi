import React from "react";

function ItemUserChat(props) {
  const handleItemClick = (params) => {
    // console.log("propsnya", props);
    props.ActionClick(props.userID);
  };

  return (
    <div
      className="list-group-item list-group-item-action py-3 lh-tight" //active
      aria-current="true"
      style={{ paddingLeft: "10px" }}
      onClick={(e) => handleItemClick(e)}
    >
      <div className="row align-items-center">
        <div className="col-2">
          <img
            className="direct-chat-img"
            // src="dist/img/user2-160x160.jpg"
            src={props.photo ? props.photo : "dist/img/no-image.png"}
            alt="message_users_image"
          />
        </div>
        <div className="col-10">
          <div className="d-flex w-100 align-items-center justify-content-between">
            {/* <strong>List group item heading</strong> */}
            <strong>{props.nama}</strong>
            <small>{props.tanggal}</small>
          </div>
          <div
            className="mb-1 small"
            style={{
              marginRight: "20px",
              display: "inline-block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "350px",
              maxWidth: "350px",
            }}
          >
            {props.PesanTerakhir}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemUserChat;
