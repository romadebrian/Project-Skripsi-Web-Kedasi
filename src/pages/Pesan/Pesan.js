import React, { Component } from "react";
import ChatBox from "./ChatBox/ChatBox";
import "./Pesan.css";
import ItemUserChat from "./props/ItemUserChat";
import firebase from "../../config/firebase";
import * as admin from "firebase-admin";

class Pesan extends Component {
  componentDidMount() {
    this.listAllUsers();
  }

  handleGetListUser = () => {};

  listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    // getAuth()
    admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          this.listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch((error) => {
        console.log("Error listing users:", error);
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

            <select className="form-control" id="Frm_Chat_User">
              <option></option>
              <option>User 1</option>
              <option>User 2</option>
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
        <ChatBox />
        {/* End of Chat Box */}
      </div>
    );
  }
}

export default Pesan;
