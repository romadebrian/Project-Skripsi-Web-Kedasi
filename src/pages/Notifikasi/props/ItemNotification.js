import React, { useState } from "react"; //frce

import $ from "jquery";
import { Link, withRouter } from "react-router-dom";

function ItemNotification(props) {
  const [action, setAction] = useState("Default");

  console.log(props.primaryKey);

  const handleAksi = () => {
    if (props.aksi === "Default") {
      window.$("#detail-notifikasi").modal("show");
    } else {
      props.history.push(props.aksi);
      console.log("Open Link");
    }
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
            <i className="fa fa-circle text-success"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ItemNotification);
