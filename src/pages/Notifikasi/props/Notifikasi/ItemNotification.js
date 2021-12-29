import React from "react"; //frce

function ItemNotification(props) {
  return (
    <div className="d-grid gap-3">
      <div className="p-5 bg-light border">
        <div className="row align-items-center">
          <div className="col">
            <small>
              {props.tanggal} from {props.pelanggan}
            </small>
            <p>{props.isi}</p>
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
