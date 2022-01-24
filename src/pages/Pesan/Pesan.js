import React, { Component, Fragment } from "react";
import ChatBox from "./ChatBox/ChatBox";
import "./Pesan.css";
import ItemUserChat from "./props/ItemUserChat";
import firebase from "../../config/firebase";

class Pesan extends Component {
  state = {
    userID: "",
    userData: [{ nama: "", gambar: "" }],
    adminData: [{ nama: "", gambar: "" }],
    chatBoxMode: false,
    dataChat: "",
    dataHistoryChat: "",
  };

  componentDidMount() {
    this.handleGetDataAdmin();
    this.handleHistoryChat();
  }
  componentDidUpdate() {
    // console.log("Data usernya", this.state.userData[0].nama);
  }

  handleGetListUser = () => {};

  handleSelectUser = (params) => {
    const ID = params.target.value;
    // console.log(params.target.value);
    this.setState({
      userID: ID,
      chatBoxMode: true,
      userData: [{ nama: "", gambar: "" }],
    });

    // this.handleGetNameUser(ID);
    this.handleGetDataUser(ID);
    this.handleGetChat(ID);
  };

  handleClickItemUserChat = (params) => {
    const ID = "Q6oONNZcYTawpMtsrv6CsTa2uz43";
    this.setState({
      userID: ID,
      chatBoxMode: true,
      userData: [{ nama: "", gambar: "" }],
    });

    // this.handleGetNameUser(ID);
    this.handleGetDataUser(ID);
    this.handleGetChat(ID);
  };

  handleGetDataUser = (ID) => {
    return firebase
      .database()
      .ref("/users/" + ID)
      .once("value")
      .then(
        (snapshot) => {
          this.setState({
            userData: [
              {
                nama: snapshot.val() && snapshot.val().Nama,
                photo: snapshot.val() && snapshot.val().Profile_Picture,
              },
            ],
          });
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

  handleGetDataAdmin = () => {
    const ID = "zAhbiHR06ZQbwSdTiT6ftB91BH62";
    return firebase
      .database()
      .ref("/users/" + ID)
      .once("value")
      .then(
        (snapshot) => {
          this.setState({
            adminData: [
              {
                nama: snapshot.val() && snapshot.val().Nama,
                photo: snapshot.val() && snapshot.val().Profile_Picture,
              },
            ],
          });
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

  handleGetChat = (ID) => {
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

        this.setState({ dataChat: data });
        console.log("data chat: ", data);
      });
  };

  handleHistoryChat = async (params) => {
    return firebase
      .database()
      .ref("/chat/")
      .on("value", (snapshot) => {
        const data = [];
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((key) => {
            data.push({
              id: key,
              data: snapshot.val()[key],
              lastPesan: "snapshot.val() && snapshot.val()[1],",
              tgl: "tanggal",
            });

            console.log(snapshot.val()[key]);

            // console.log(
            //   snapshot.val()["Q6oONNZcYTawpMtsrv6CsTa2uz43"][
            //     "-Mt4jhrsapvSMaYPmGpt"
            //   ].Pesan
            // );

            return data;
          });
        } else {
          console.log("tidak chat");
        }

        this.setState({ dataHistoryChat: data });
        console.log("history chat: ", data);
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
            {this.state.dataHistoryChat.length > 0 ? (
              <Fragment>
                {this.state.dataHistoryChat.map((chat) => {
                  // console.log("Data Pesanan ", pesanan.data.OrderId);
                  return (
                    <ItemUserChat
                      key={chat.id}
                      ActionClick={(e) => this.handleClickItemUserChat(e)}
                    />
                  );
                })}
              </Fragment>
            ) : null}
          </div>
        </div>

        {/* End Part List User Who Messege You */}

        {/* Chat Box */}
        {this.state.chatBoxMode ? (
          <ChatBox
            UID={this.state.userID}
            dataUser={this.state.userData}
            dataAdmin={this.state.adminData}
            chatData={this.state.dataChat}
          />
        ) : null}

        {/* End of Chat Box */}
      </div>
    );
  }
}

export default Pesan;
