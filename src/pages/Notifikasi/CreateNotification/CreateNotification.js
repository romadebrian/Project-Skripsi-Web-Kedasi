import React from "react"; //rfce
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import firebase from "../../../config/firebase";

import { FormattingDateTime } from "../../../config/formattingDateTime";

function CreateNotification(props) {
  const [isloaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("All");
  const [aksi, setAksi] = useState("Pemberitahuan");
  const [orderId, setOrderId] = useState("");

  const [listOrderUser, setListOrderUser] = useState([]);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    window.$("#TanggalSewa").datetimepicker({
      format: "DD-MM-YYYY",
    });
    window.$("#TanggalSelesai").datetimepicker({
      format: "DD-MM-YYYY",
    });

    if (isloaded === false) {
      handleGetListUser();
      setLoaded(true);
    }
  }, [isloaded]);

  const handleGetListUser = () => {
    return firebase
      .database()
      .ref("users")
      .once("value", (snapshot) => {
        console.log(snapshot.val());

        const data = [];
        Object.keys(snapshot.val()).map((key) => {
          // console.log(snapshot.val());
          // console.log(snapshot.val()[key]);
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
          return data;
        });

        // console.log(data);
        setListUser(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Judul: ", title);
    console.log("isi: ", message);
    console.log("Target: ", user);

    if (user === "All") {
      handleCreateNotificationToAll();
    } else {
      handleCreateNotificationToOneUser();
    }

    // if (e.target[3].value === "Default") {
    //   aksinya = "Default";
    //   console.log("Default");
    // } else if (e.target[3].value === "Buka Aplikasi") {
    //   aksinya = e.target[4].value;
    //   console.log("Buka Aplikasi", e.target[4].value);
    // } else if (e.target[3].value === "Buka Url") {
    //   aksinya = e.target[4].value;
    //   console.log("Buka Url", e.target[4].value);
    // } else {
    //   console.log("error");
    // }

    // firebase
    //   .database()
    //   .ref("notifikasi")
    //   .push(
    //     {
    //       Judul: e.target[0].value,
    //       Isi: e.target[1].value,
    //       Target: e.target[2].value,
    //       Aksi: aksinya,
    //       waktu: tanggal,
    //       Status: "Unread",
    //     },
    //     (error) => {
    //       if (error) {
    //         // The write failed...
    //         alert("Gagal Simpan");
    //       } else {
    //         // Data saved successfully!
    //         // alert("Profile Berhasil Di Simpan");
    //         toastSucces();
    //         console.log(
    //           "send value: ",
    //           e.target[0].value,
    //           e.target[1].value,
    //           e.target[2].value,
    //           aksinya,
    //           "Unread"
    //         );

    //         window.$("#form-notifikasi").modal("hide");
    //       }
    //     }
    //   );
  };

  const handleCreateNotificationToOneUser = () => {
    var idUser = user;
    var to = "";
    var DateTimeNow = FormattingDateTime(new Date());

    listUser.map((val) => {
      if (val.id === user) {
        to = val.data.TokenNotif;
      }
      return null;
    });

    if (aksi === "Transaksi") {
      const data = { Action: "CheckOut", OrderID: orderId };
      handleCreateRemoteNotification(to, data);
    } else if (aksi === "Pemberitahuan") {
      const data = { Action: "Notification" };
      handleCreateRemoteNotification(to, data);
    }

    var postListRef = firebase.database().ref(`users/${idUser}/notifikasi`);
    var newPostRef = postListRef.push();
    newPostRef.set(
      {
        Aksi: aksi,
        Date: DateTimeNow,
        Isi: message,
        Judul: title,
        Meta_Data: orderId,
        Status: "Unread",
        Target: idUser,
      },
      (error) => {
        if (error) {
          alert("Gagal Simpan");
        } else {
          toastSucces();
          clearValue();
          window.$("#form-notifikasi").modal("hide");
        }
      }
    );

    // const db = getDatabase();
    // const addNotification = ref(db, `notifikasi`);
    // const newNotificationRef = push(addNotification);

    // set(newNotificationRef, {
    //   Aksi: aksi,
    //   Date: DateTimeNow,
    //   Isi: e.target[1].value,
    //   Judul: e.target[0].value,
    //   Meta_Data: metaData,
    //   Status: "Unread",
    //   Target: idUser,
    // });
  };

  const handleCreateNotificationToAll = (e) => {
    // var DateTimeNow = FormattingDateTime(new Date());
    // console.log(DateTimeNow);
    // var postListRef = firebase.database().ref(`users/${idUser}/notifikasi`);
    // var newPostRef = postListRef.push();
    // newPostRef.set({
    //   Aksi: aksi,
    //   Date: DateTimeNow,
    //   Isi: e.target[1].value,
    //   Judul: e.target[0].value,
    //   Meta_Data: metaData,
    //   Status: "Unread",
    //   Target: idUser,
    // });
  };

  const handleCreateRemoteNotification = async (to, data) => {
    console.log(data);
    const myData = {
      to: to,
      priority: "high",
      notification: {
        title: title,
        body: message,
      },
      // data: { Action: "Chat" },
      // data: { Action: "CheckOut", OrderID: "ORD0047" },
      data: data,
      // foreground: true
    };

    const result = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization:
          "key=AAAA6jj0k_w:APA91bFVagvVrQ1UsvzH-GglbdFAzvfuGhE1A6KABx3Y3QdiiyKNba9RG6zAkYqm3oAd23M-l7BuhzatGHAOHln6L2lho1ZrhMUM5DB678r2Z9_Bd79z46HCiezO9q9zD6CaiTa_h6C2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myData),
    });

    const resultJson = await result.json();
    console.log(resultJson);
  };

  const toastSucces = () => {
    var Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    Toast.fire({
      icon: "success",
      title: "Pemberitahuan Berhasil Di Kirim",
    });
  };

  const clearValue = () => {
    setTitle("");
    setMessage("");
    setUser("All");
    setAksi("Pemberitahuan");
    setOrderId("");
  };

  // handle get list transaction user
  useEffect(() => {
    if (user !== "All") {
      if (aksi === "Transaksi") {
        return firebase
          .database()
          .ref("users/" + user + "/order")
          .once("value", (snapshot) => {
            // console.log(snapshot.val());

            const data = [];
            if (snapshot.exists()) {
              Object.keys(snapshot.val()).map((key) => {
                // console.log(snapshot.val());
                // console.log(snapshot.val()[key].OrderId);
                data.push(snapshot.val()[key].OrderId);
                return data;
              });
              // console.log(data);
              setListOrderUser(data);
              setOrderId(data[0]);
            } else {
              setListOrderUser([]);
              setOrderId("");
            }
          });
      } else {
        setOrderId("");
      }
    } else {
      setOrderId("");
    }
  }, [user, aksi]);

  useEffect(() => {
    console.log(orderId);
  }, [orderId]);

  return (
    <div className="modal fade" id="form-notifikasi">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Notifikasi Baru</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label>Judul</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="judul notifikasi"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Isi</label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="3"
                    placeholder="isi notifikasi"
                    value={message}
                    onChange={({ target }) => setMessage(target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Target</label>
                  <select
                    className="form-control"
                    id="Frm_Target_User"
                    value={user}
                    onChange={({ target }) => setUser(target.value)}
                  >
                    <option>All</option>
                    {listUser.map((dataUser) => {
                      // console.log(dataUser);
                      return (
                        <option value={dataUser.id} key={dataUser.id}>
                          {dataUser.data.Nama}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label>Action</label>
                  <select
                    className="form-control"
                    id="Frm_Aksi"
                    onChange={({ target }) => setAksi(target.value)}
                  >
                    <option>Pemberitahuan</option>
                    {user === "All" ? null : <option>Transaksi</option>}
                  </select>
                </div>

                {aksi === "Transaksi" ? (
                  <div className="form-group">
                    {/* <input /> */}
                    <label>ID Order</label>
                    <select
                      className="form-control"
                      onChange={({ target }) => setOrderId(target.value)}
                    >
                      {listOrderUser.length > 0 ? (
                        listOrderUser.map((IdOrder) => {
                          return <option key={IdOrder}>{IdOrder}</option>;
                        })
                      ) : (
                        <option>User Belum Memiliki Transaksi</option>
                      )}
                    </select>
                  </div>
                ) : null}
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-target="#ModalClose"
                  data-dismiss="modal"
                  style={{ marginLeft: 10 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNotification;
