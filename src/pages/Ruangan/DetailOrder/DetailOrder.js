import React, { useState, useEffect } from "react";
import firebase from "../../../config/firebase";

function DetailOrder(props) {
  const [tanggalSekarang, setTanggalSekarang] = useState("");
  const [isloaded, setLoaded] = useState(false);

  const [valDetailOrder, setValDetailOrder] = useState({
    idOrder: "",
    pemesan: "roma Debrian",
    ruangannya: "Ruangan 001",
    tglSewa: "tanggal sewanya",
    tglSelesai: "tanggal kelar",
    statPembayaran: "bayar woe",
  });

  useEffect(() => {
    window.$("#TanggalSewa").datetimepicker({
      format: "DD-MM-YYYY",
    });
    window.$("#TanggalSelesai").datetimepicker({
      format: "DD-MM-YYYY",
    });

    function convertTanggalSekarang() {
      let hariini = new Date();

      let tgl =
        hariini.getDate() +
        "-" +
        parseInt(hariini.getMonth() + 1) +
        "-" +
        hariini.getFullYear();

      setTanggalSekarang(tgl);
    }

    if (isloaded === false) {
      convertTanggalSekarang();

      // console.log(new Date());

      setLoaded(true);
    }

    metodeGetData();
  }, [isloaded]);

  const handleSubmit = async (e) => {
    var StatusPembayaran;
    e.preventDefault();

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
        },
        (error) => {
          if (error) {
            // The write failed...
            alert("Gagal Simpan");
          } else {
            // Data saved successfully!
            alert("Profile Berhasil Di Simpan");
            console.log(
              "send value: ",
              e.target[0].value,
              e.target[1].value,
              e.target[2].value,
              e.target[3].value,
              e.target[4].value,
              StatusPembayaran
            );
            window.location.reload();
          }
        }
      );
  };

  const metodeGetData = () => {
    // return firebase
    //   .database()
    //   .ref("/order/" + this.state.userId)
    //   .once("value")
    //   .then(
    //     (snapshot) => {
    //       this.setState({
    //         nama: snapshot.val() && snapshot.val().Nama,
    //         // email: snapshot.val() && snapshot.val().Email,
    //         email: JSON.parse(localStorage.getItem("UserEmail")),
    //         telepon: snapshot.val() && snapshot.val().Telepon,
    //         alamat: snapshot.val() && snapshot.val().Alamat,
    //         setUrl: snapshot.val() && snapshot.val().Profile_Picture,
    //       });
    //       // console.log(username);
    //       console.log("Photo Profile Link ", this.state.setUrl);
    //       // console.log(this.state.email);
    //     },
    //     (error) => {
    //       if (error) {
    //         console.log("read failed", error);
    //         // The write failed...
    //       } else {
    //         // Data saved successfully!
    //       }
    //     }
    //   );

    return firebase
      .database()
      .ref("/order/-MrVxTiXFX_1Wwodgzkt/")

      .once("value")
      .then(
        (value) => {
          console.log(value.val() && value.val().OrderId);
        },
        (err) => console.log(err)
      );
  };

  return (
    <div className="modal fade" id="form-edit">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Detail Pesan Ruangan</h3>
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
                    defaultValue={props.primaryKey}
                  />
                </div>
                <div className="form-group">
                  <label>Nama Pemesan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NamaPemesan"
                    placeholder="Nama Panjang"
                    defaultValue={valDetailOrder.pemesan}
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
                    id="TanggalSewa"
                    data-target-input="nearest"
                  >
                    <input
                      type="text"
                      className="form-control datetimepicker-input"
                      data-target="#TanggalSewa"
                      value={tanggalSekarang}
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    />
                    <div
                      className="input-group-append"
                      data-target="#TanggalSewa"
                      data-toggle="datetimepicker"
                    >
                      <div className="input-group-text">
                        <i className="fa fa-calendar" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
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
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <div
                      className="input-group-append"
                      data-target="#TanggalSelesai"
                      data-toggle="datetimepicker"
                    >
                      <div className="input-group-text">
                        <i className="fa fa-calendar" />
                      </div>
                    </div>
                  </div>
                </div>

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

export default DetailOrder;
