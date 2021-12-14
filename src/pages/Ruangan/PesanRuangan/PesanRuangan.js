import React from "react";
import { useState, useEffect } from "react";

function PesanRuangan(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    window.$("#reservationdate").datetimepicker({
      format: "L",
    });

    let hariini = new Date();

    let tgl =
      hariini.getDate() +
      "-" +
      parseInt(hariini.getMonth() + 1) +
      "-" +
      hariini.getFullYear();

    setDate(tgl);
    console.log(new Date());
  });

  const formatDate = (e) => {
    let tanggal = new Date(e.target[3].value);
    let dateMDY = `${tanggal.getDate()}-${
      tanggal.getMonth() + 1
    }-${tanggal.getFullYear()}`;
    // setDate("31-12-2021");

    e.preventDefault();
    console.log(dateMDY);
  };

  const handleSubmit = () => {};

  return (
    <div className="container">
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Pesan Ruangan</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
        <form onSubmit={formatDate}>
          <div className="card-body">
            <div className="form-group">
              <label>Order ID</label>
              <input type="text" className="form-control" id="orderID" />
            </div>
            <div className="form-group">
              <label>Nama Pemesan</label>
              <input
                type="text"
                className="form-control"
                id="NamaPemesan"
                placeholder="Nama Panjang"
              />
            </div>
            <div className="form-group">
              <label>Ruangan</label>
              <select className="form-control">
                <option>ROOM 001</option>
                <option>ROOM 002</option>
                <option>ROOM 003</option>
                <option>ROOM 004</option>
                <option>ROOM 005</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tanggal Sewa:</label>
              <div
                className="input-group date"
                id="reservationdate"
                data-target-input="nearest"
              >
                <input
                  type="text"
                  className="form-control"
                  className="form-control datetimepicker-input"
                  data-target="#reservationdate"
                  // onChange={(e) => setDate(e.target.value)}
                  // onClick={(e) => console.log(e.target.value)}
                  value={date}
                  onChange={(e) => console.log(e.target.value)}
                />
                <div
                  className="input-group-append"
                  data-target="#reservationdate"
                  data-toggle="datetimepicker"
                >
                  <div className="input-group-text">
                    <i className="fa fa-calendar" />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Tanggal Selesai</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PesanRuangan;
