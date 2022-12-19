import React, { useEffect } from "react"; //frce
import firebase from "../../../config/firebase";
import { withRouter, useHistory } from "react-router-dom";

function ItemNotification(props) {
  let history = useHistory();

  useEffect(() => {
    console.log(props);
  }, [props]);

  const HandleAksi = () => {
    if (props.aksi === "CheckOut") {
      // this.Nav.navigate("CheckOut", { orderID: notification.data.OrderID });
      history.push("/ruangan");
    } else if (props.aksi === "Chat") {
      history.push("/pesan");
    } else if (props.aksi === "Notification") {
      window.$("#detail-notifikasi").modal("show");
    }

    // Update status read to was read
    firebase
      .database()
      .ref("notifikasi/" + props.primaryKey + "/Status")
      .set("Read");

    const data = [
      {
        judul: props.judul,
        isi: props.isi,
      },
    ];

    props.sendData(data);
  };

  return (
    <div
      className="d-grid gap-3"
      // data-toggle="modal"
      // data-target="#detail-notifikasi"
      onClick={(e) => HandleAksi(e)}
    >
      <div className="p-5 bg-light border">
        <div className="row align-items-center">
          <div className="col">
            <small>{props.tanggal}</small>
            <p>
              {props?.pelanggan} {props.isi}
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
