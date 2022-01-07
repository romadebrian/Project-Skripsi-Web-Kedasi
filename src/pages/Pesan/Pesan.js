import React, { Component } from "react";
import ChatBox from "./ChatBox/ChatBox";
import "./Pesan.css";
import ItemUserChat from "./props/ItemUserChat";
import firebase from "../../config/firebase";

class Pesan extends Component {
  state = {
    userName: "",
  };

  componentDidMount() {}

  handleGetListUser = () => {};

  handleSelectUser = (params) => {
    const ID = params.target.value;
    // console.log(params.target.value);
    // this.setState({ userID: params.target.value });

    this.handleGetNameUser(ID);
    this.handleChat(ID);
  };

  handleGetNameUser = (params) => {
    const ID = params;
    return firebase
      .database()
      .ref("/users/" + ID)
      .once("value")
      .then(
        (snapshot) => {
          this.setState({ userName: snapshot.val() && snapshot.val().Nama });
          console.log(snapshot.val() && snapshot.val().Nama);
        },
        (error) => {
          if (error) {
            console.log("read failed", error);
            // The write failed...
          } else {
            // Data saved successfully!
          }
        }
      );
  };

  handleChat = (ID) => {
    return firebase
      .database()
      .ref("/chat/" + ID)
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
          console.log("tidak chat");
        }

        // this.setState({ dataNotifikasi: data });
        console.log("data chat: ", data);
      });
  };

  render() {
    return (
      <div className="chatbox">
        {/* List User Who Messege You */}
        <div
          className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
          // style={{ width: 380, height: 640 }}
        >
          <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
            <span className="fs-5 fw-semibold select-user">Pilih User</span>

            <select
              className="form-control"
              id="Frm_Chat_User"
              onChange={(e) => this.handleSelectUser(e)}
            >
              <option></option>
              <option>Q6oONNZcYTawpMtsrv6CsTa2uz43</option>
              <option>zAhbiHR06ZQbwSdTiT6ftB91BH62</option>
              <option>User 3</option>
              <option>User 5</option>
              <option>User 6</option>
            </select>
          </div>
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
        <ChatBox UID={this.state.userID} Nama={this.state.userName} />
        {/* End of Chat Box */}
      </div>
    );
  }
}

export default Pesan;
