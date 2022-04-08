import React from "react"; //frce
import firebase from "../../../config/firebase";
import { withRouter } from "react-router-dom";

function ItemNotification(props) {
  const handleAksi = () => {
    if (props.aksi === "Default") {
      window.$("#detail-notifikasi").modal("show");
    } else {
      props.history.push(props.aksi);
      console.log("Open Link");
    }

    handleStatusRead();

    const data = [
      {
        judul: props.judul,
        isi: props.isi,
      },
    ];

    props.sendData(data);

    // console.log("judul: ", props);
  };

  const handleStatusRead = () => {
    firebase
      .database()
      .ref("notifikasi/" + props.primaryKey)
      .set(
        {
          Judul: props.judul,
          Isi: props.isi,
          Target: props.pelanggan,
          Aksi: props.aksi,
          Status: "Read",
        },
        (error) => {
          if (error) {
            // The write failed...
            alert("error: ", error);
          } else {
            // Data saved successfully!
          }
        }
      );
  };

  return (
    <div
      className="d-grid gap-3"
      // data-toggle="modal"
      // data-target="#detail-notifikasi"
      onClick={(e) => handleAksi(e)}
    >
      <div className="p-5 bg-light border">
        <div className="row align-items-center">
          <div className="col">
            <small>{props.tanggal}</small>
            <p>
              {props.pelanggan} {props.isi}
            </p>
          </div>
          <span>
            {props.status !== "Read" ? (
              <i className="fa fa-circle text-success"></i>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ItemNotification);
