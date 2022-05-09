import React from "react"; //rfce
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import firebase from "../../../config/firebase";
import DateTimePicker from "react-datetime-picker";

function PesanRuangan(props) {
  const [isloaded, setLoaded] = useState(false);
  const [paket, setPaket] = useState("");
  const [totalPaket, setTotalPaket] = useState(1);
  const [nameCostumer, setNameCostumer] = useState("");
  const [room, setRoom] = useState("");
  const [tanggalSekarang, setTanggalSekarang] = useState("");
  const [tglMulai, setTglMulai] = useState("");
  const [tglSelesai, setTglSelesai] = useState("");

  useEffect(() => {
    // window.$("#TanggalSewa").datetimepicker({
    //   format: "DD-MM-YYYY",
    // });
    // window.$("#TanggalSelesai").datetimepicker({
    //   format: "DD-MM-YYYY",
    // });

    function convertTanggalSekarang() {
      let hariini = new Date();

      let tgl =
        hariini.getDate() +
        "-" +
        parseInt(hariini.getMonth() + 1) +
        "-" +
        hariini.getFullYear();

      setTanggalSekarang(hariini);
    }

    if (isloaded === false) {
      convertTanggalSekarang();

      // console.log(new Date());

      setLoaded(true);
    }
  }, [isloaded]);

  const handleSubmit = (e) => {
    var StatusPembayaran;
    e.preventDefault();

    // console.log(e);

    console.log("Order Id: ", e.target[0].value);
    console.log("Nama Pemesan: ", e.target[1].value);
    console.log("Ruangan: ", e.target[2].value);
    console.log("Tanggal Sewa: ", e.target[3].value);
    console.log("Tanggal Selesai: ", e.target[4].value);

    if (e.target[5].checked === true) {
      StatusPembayaran = "Active";
      console.log("Active");
    } else if (e.target[6].checked === true) {
      StatusPembayaran = "Menunggu Pembayaran";
      console.log("Menunggu Pembayaran");
    } else if (e.target[7].checked === true) {
      StatusPembayaran = "Selesai";
      console.log("Selesai");
    } else if (e.target[8].checked === true) {
      StatusPembayaran = "Batal";
      console.log("Batal");
    } else {
      console.log("error");
    }

    firebase
      .database()
      .ref("order")
      .push(
        {
          OrderId: e.target[0].value,
          NamaPemesan: e.target[1].value,
          Ruangan: e.target[2].value,
          TanggalSewa: e.target[3].value,
          TanggalSelesai: e.target[4].value,
          Status: StatusPembayaran,
          BuktiPembayaran: "",
        },
        (error) => {
          if (error) {
            // The write failed...
            alert("Gagal Simpan");
          } else {
            // Data saved successfully!
            // alert("Profile Berhasil Di Simpan");
            toastSucces();
            console.log(
              "send value: ",
              e.target[0].value,
              e.target[1].value,
              e.target[2].value,
              e.target[3].value,
              e.target[4].value,
              StatusPembayaran
            );

            window.$("#modal-lg").modal("hide");

            // window.location.reload();

            // window.$(this.modal).modal("hide");
            // window.$(this.modal).on("hidden.bs.modal");

            // e.target[10].dismiss = "modal";
          }
        }
      );
  };

  const checkDateAvaliable = (e) => {
    // console.log(e.nativeEvent.path);
    // console.log(e.nativeEvent.path[5][4].value);
    console.log(e.target.parentNode.firstChild.offsetParent);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    // console.log(e.target.parentElement[3].value);
    // params.target.parentNode.children[0].innerText;
    // console.log("Tanggal Sewa: ", e.target[3].value);
    // console.log("Tanggal Selesai: ", e.target[4].value);
  };

  const handleTotalPayment = () => {};

  const toastSucces = () => {
    var Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    Toast.fire({
      icon: "success",
      title: "Pemesanan Ruangan Berhasil",
    });
  };

  return (
    <div
      className="modal fade"
      id="modal-lg"
      // onMouseEnter={(e) => handleChange(e)}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Pesan Ruangan </h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label>Order ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="orderID"
                    value={props.newOrderId}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Paket</label>
                  <div className="input-group" id="Paket">
                    <select className="form-control" onChange={handleChange}>
                      <option>--- Casual Coworking ---</option>
                      <option>PERJAM</option>
                      <option>HARIAN</option>
                      <option>HARIAN(PELAJAR)</option>
                      <option>--- Monthly Coworking ---</option>
                      <option>BULANAN 25JAM</option>
                      <option>BULANAN 50JAM</option>
                      <option>BULANAN 100JAM</option>
                      <option>BULANAN TANPA BATAS</option>
                    </select>

                    <div className="input-group-append">
                      <input
                        style={{ width: "50px", paddingLeft: "10px" }}
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        defaultValue={totalPaket}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Nama Pemesan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NamaPemesan"
                    placeholder="Nama Pemesan"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Ruangan</label>
                  <select className="form-control" onChange={handleChange}>
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
                    id="TanggalSewa"
                    data-target-input="nearest"
                  >
                    {/* <input
                      type="text"
                      className="form-control datetimepicker-input"
                      data-target="#TanggalSewa"
                      value={tanggalSekarang}
                      onChange={(e) => {
                        console.log(tanggalSekarang);
                      }}
                      // onCompositionUpdate={() => console.log(tanggalSekarang)}
                    /> */}
                    <DateTimePicker
                      className="form-control "
                      onChange={(e) => {
                        setTglMulai(e);
                        console.log(e);
                      }}
                      value={tglMulai}
                      format={"dd-MM-y"}
                    />
                    <div
                      className="input-group-append"
                      data-target="#TanggalSelesai"
                      data-toggle="datetimepicker"
                    >
                      <div
                        className="input-group-text"
                        onClick={(e) => checkDateAvaliable(e)}
                      >
                        <i className="fa fa-search" />
                      </div>
                    </div>
                    {/* <div
                      className="input-group-append"
                      data-target="#TanggalSewa"
                      data-toggle="datetimepicker"
                    >
                      <div className="input-group-text">
                        <i className="fa fa-calendar" />
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* <div className="form-group">
                  <label>Tanggal Selesai:</label>
                  <div
                    className="input-group date"
                    id="TanggalSelesai"
                    data-target-input="nearest"
                  >
                    <input
                      type="text"
                      className="form-control datetimepicker-input"
                      data-target="#TanggalSelesai"
                      value={tanggalSekarang}
                      // onChange={(e) => console.log(e.target.value)}
                      readOnly
                    />
                    <div
                      className="input-group-append"
                      data-target="#TanggalSelesai"
                      data-toggle="datetimepicker"
                    >
                      <div className="input-group-text">
                        <i className="fa fa-calendar" />
                      </div>
                      <div
                        className="input-group-text"
                        onClick={(e) => checkDateAvaliable(e)}
                      >
                        <i className="fa fa-search" />
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="form-group">
                  <label>Status</label>
                  <br />
                  <div
                    className="icheck-success d-inline"
                    style={{ marginRight: 10 }}
                  >
                    <input
                      type="radio"
                      id="radioPrimary1"
                      name="r1"
                      defaultChecked
                    />
                    <label htmlFor="radioPrimary1">Active</label>
                  </div>
                  <div
                    className="icheck-sunflower d-inline"
                    style={{ marginRight: 10 }}
                  >
                    <input type="radio" id="radioPrimary2" name="r1" />
                    <label htmlFor="radioPrimary2">Menunggu Pembayaran</label>
                  </div>
                  <div
                    className="icheck-concrete d-inline"
                    style={{ marginRight: 10 }}
                  >
                    <input type="radio" id="radioPrimary3" name="r1" />
                    <label htmlFor="radioPrimary3">Selesai</label>
                  </div>
                  <div className="icheck-danger d-inline">
                    <input type="radio" id="radioPrimary4" name="r1" />
                    <label htmlFor="radioPrimary4">Batal</label>
                  </div>
                </div>
              </div>
              {/* /.card-body */}

              <div style={{ marginRight: "10px", color: "green" }}>
                <h3 className="float-right">Total Rp 1.200.000</h3>
              </div>

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

export default PesanRuangan;
