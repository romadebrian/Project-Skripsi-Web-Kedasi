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
    dataHistoryChat: [],
    listUser: "",
    contact: [{ height: "0", mode: false }],
  };

  componentDidMount() {
    this.handleGetDataAdmin();
    this.getListPrimarykeyUserWasChat();
    this.handleGetListUser();
  }

  handleGetListUser = () => {
    return firebase
      .database()
      .ref("/users/")
      .on("value", (snapshot) => {
        const listUser = [];
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((key) => {
            listUser.push({
              id: key,
              nama: snapshot.val() && snapshot.val()[key].Nama,
              photo: snapshot.val() && snapshot.val()[key].Profile_Picture,
            });
            return listUser;
          });
        } else {
          console.log("tidak chat");
        }

        this.setState({ listUser: listUser });
        // console.log("list user: ", listUser);
      });
  };

  handleSelectUser = (params) => {
    const selectedIndex = params.target.options.selectedIndex;
    if (selectedIndex === 0) {
      // console.log("kosong");
    } else {
      console.log(
        "id user yang di pilih",
        params.target.options[selectedIndex].getAttribute("data-key")
      );
      const ID = params.target.options[selectedIndex].getAttribute("data-key");

      this.setState({
        userID: ID,
        chatBoxMode: true,
        userData: [{ nama: "", gambar: "" }],
      });

      // this.handleGetNameUser(ID);
      this.handleGetDataUser(ID);
      this.handleGetChat(ID);
    }
  };

  handleClickItemUserChat = (ID) => {
    console.log("ID user chat", ID);
    // const ID = "Q6oONNZcYTawpMtsrv6CsTa2uz43";
    this.setState({
      userID: ID,
      chatBoxMode: true,
      userData: [{ nama: "", gambar: "" }],
    });

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
          console.log("tidak ada chat");
        }

        this.setState({ dataChat: data });
        console.log("data chat: ", data);
      });
  };

  getListPrimarykeyUserWasChat = () => {
    firebase
      .database()
      .ref("/chat/")
      .on("value", (snapshot) => {
        const data = [];
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((key) => {
            data.push({
              id: key,
            });

            // console.log(key);

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

        this.setState({ dataHistoryChat: data }, () => {
          this.handleHistoryChat();
        });
        // console.log("history chat: ", this.state.dataHistoryChat);
      });
  };

  handleHistoryChat = async () => {
    // deklarasi variable harus sama dengan di state
    const dataHistoryChat = [];

    if (this.state.dataHistoryChat.length > 0) {
      this.state.dataHistoryChat.map(async (chat) => {
        // console.log("susun data id", chat.id);

        // Get User Info from table user based on user prymary key in list history chat
        const dataUser = await this.dataUserForHistoryChat(chat.id);
        // Get data Last Chat based on user primary key in list history chat
        const LastChatData = await this.dataLastChat(chat.id);

        let namaUser = dataUser[0].nama;
        let photoUser = dataUser[0].photo;

        let tanggal = LastChatData[0].tanggal;
        let lastChat = LastChatData[0].lastChat;

        // console.log("ambil data chat", dataLastChat);

        dataHistoryChat.push({
          id: chat.id,
          nama: namaUser,
          photo: photoUser,
          tanggalLastChat: tanggal,
          lastChat: lastChat,
        });

        this.setState({ dataHistoryChat }, () => {
          // console.log("hasil susun data last chat", this.state.dataHistoryChat);
        });
        // return dataHistoryChat;
      });
    } else {
      console.log("data kosong");
    }

    // console.log("data history chat =", this.state.dataHistoryChat);
  };

  dataUserForHistoryChat = (ID) => {
    const dataUserNya = [];

    return new Promise((resolve) => {
      firebase
        .database()
        .ref("/users/" + ID)
        .on("value", (snapshot) => {
          // const dataUserNya = [];

          dataUserNya.push({
            nama: snapshot.val() && snapshot.val().Nama,
            photo: snapshot.val() && snapshot.val().Profile_Picture,
          });
          // console.log(snapshot.val());

          // return dataUserNya;
          resolve(dataUserNya);
        });
    });

    // return dataUserNya;
  };

  dataLastChat = (ID) => {
    const dataChatNya = [];

    // const ID = "Q6oONNZcYTawpMtsrv6CsTa2uz43";

    return new Promise((resolve) => {
      firebase
        .database()
        .ref("/chat/" + ID)
        .limitToLast(1)
        .on("value", (snapshot) => {
          // console.log("Data last chat", snapshot.val());

          Object.keys(snapshot.val()).map((key) => {
            dataChatNya.push({
              // id: key,
              // data: snapshot.val()[key],

              lastChat: snapshot.val() && snapshot.val()[key].Pesan,
              tanggal: snapshot.val() && snapshot.val()[key].Waktu,
            });
            // console.log(dataChatNya);

            return dataChatNya;
          });

          // return dataUserNya;
          resolve(dataChatNya);
        });
    });
  };

  showContact = (e) => {
    if (this.state.contact[0].mode === false) {
      this.setState({ contact: [{ height: 200, mode: true }] });
    } else {
      this.setState({ contact: [{ height: 0, mode: false }] });
    }
  };

  render() {
    return (
      <div className="chatbox">
        {/* List User Who Messege You */}
        <div className="direct-chat d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
          <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
            {/* <span className="fs-5 fw-semibold select-user">Pilih User</span> */}

            <select
              className="form-control"
              id="Frm_Chat_User"
              onChange={(e) => this.handleSelectUser(e)}
            >
              <option></option>
              {this.state.listUser.length > 0 ? (
                <Fragment>
                  {this.state.listUser.map((list) => {
                    // console.log("render list", list);
                    return (
                      <option key={list.id} data-key={list.id}>
                        {list.nama}
                      </option>
                    );
                  })}
                </Fragment>
              ) : null}
            </select>

            <button
              type="button"
              className="btn btn-tool"
              data-toggle="tooltip"
              title="Contacts"
              data-widget="chat-pane-toggle"
              onClick={this.showContact}
            >
              <i className="fas fa-comments" />
            </button>
          </div>

          <div className="list-group list-group-flush border-bottom scrollarea">
            <div
              className="card-body"
              style={{ height: this.state.contact[0].height }}
            >
              <div className="direct-chat-contacts">
                <ul className="contacts-list">
                  {this.state.listUser.length > 0 ? (
                    <Fragment>
                      {this.state.listUser.map((list) => {
                        // console.log("render list", list);
                        return (
                          <li
                            key={list.id}
                            onClick={() =>
                              this.handleClickItemUserChat(list.id)
                            }
                          >
                            {/* <a href="/#"> */}
                            <img
                              className="contacts-list-img css-pointer"
                              src={
                                list.photo
                                  ? list.photo
                                  : "dist/img/no-image.png"
                              }
                              width="40"
                              height="40"
                              alt="userkjahw.dh"
                            />
                            <div className="nama-contactnya">{list.nama}</div>
                            {/* </a> */}
                          </li>
                        );
                      })}
                    </Fragment>
                  ) : null}
                  {/* End Contact Item */}
                </ul>
                {/* /.contacts-list */}
              </div>
            </div>

            {this.state.dataHistoryChat.length > 0 ? (
              <Fragment>
                {this.state.dataHistoryChat.map((chat) => {
                  console.log("data yang di render", chat);
                  // console.log("data yang di render", chat.dataSusun);

                  return (
                    <ItemUserChat
                      key={chat.id}
                      userID={chat.id}
                      nama={chat.nama}
                      photo={chat.photo}
                      tanggal={chat.tanggalLastChat}
                      PesanTerakhir={chat.lastChat}
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
