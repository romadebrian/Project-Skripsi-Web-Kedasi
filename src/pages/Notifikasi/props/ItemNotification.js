import React from "react"; //frce
import { useState } from "react/cjs/react.development";

function ItemNotification(props) {
  const [action, setAction] = useState("Default");
  const handleAksi = () => {
    if (props.aksi === "Default") {
    } else {
    }
  };

  return (
    <div
      className="d-grid gap-3"
      {...(action === "Default" ? (
        <>data-toggle="modal" data-target="#detail-notifikasi"</>
      ) : (
        console.log("gg")
      ))}
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

export default ItemNotification;
