import React, { useState, useEffect } from "react";
import firebase from "../../../config/firebase";

function DetailOrder(props) {
  const [tanggalSekarang, setTanggalSekarang] = useState("");
  const [isloaded, setLoaded] = useState(false);

  const [valDetailOrder, setValDetailOrder] = useState({
    idOrder: "",
    pemesan: "",
    ruangannya: "",
    tglSewa: "",
    tglSelesai: "",
    statPembayaran: "",
  });

  useEffect(() => {
    window.$("#EditTanggalSewa").datetimepicker({
      format: "DD-MM-YYYY",
    });
    window.$("#EditTanggalSelesai").datetimepicker({
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

    // metodeGetData();
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
    if (props.editStatus === true) {
      const data = props.dataDetail;
      // props.editFunction();
      console.log("Datanya", data.Ruangan);

      setValDetailOrder({
        idOrder: data.OrderId,
        pemesan: data.NamaPemesan,
        ruangannya: data.Ruangan,
        tglSewa: data.TanggalSewa,
        tglSelesai: data.TanggalSelesai,
        statPembayaran: data.Status,
      });
    } else {
      return null;
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "Frm_Ruangan") {
      setValDetailOrder({
        ...valDetailOrder,
        ruangannya: e.target.value,
      });
    } else if (e.target.id === "radioEdit1") {
      setValDetailOrder({
        ...valDetailOrder,
        statPembayaran: "Active",
      });
    } else if (e.target.id === "radioEdit2") {
      setValDetailOrder({
        ...valDetailOrder,
        statPembayaran: "Menunggu Pembayaran",
      });
    } else if (e.target.id === "radioEdit3") {
      setValDetailOrder({
        ...valDetailOrder,
        statPembayaran: "Selesai",
      });
    } else if (e.target.id === "radioEdit4") {
      setValDetailOrder({
        ...valDetailOrder,
        statPembayaran: "Batal",
      });
    } else {
      console.log("error");
    }

    // console.log(e);
  };

  const selectStatus = () => {
    // var status = valDetailOrder.statPembayaran;
    // switch (status) {
    //   case "Active":
    //     console.log("Active");
    //     break;
    //   case "Menunggu Pembayaran":
    //     console.log("Menunggu Pembayaran");
    //     break;
    //   case "Selesai":
    //     console.log("Selesai");
    //     break;
    //   default:
    //     console.log("error");
    // }
  };

  return (
    <div className="modal fade" id="form-edit" onMouseEnter={metodeGetData}>
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
                    defaultValue={valDetailOrder.idOrder}
                    readOnly
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
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Ruangan</label>
                  <select
                    className="form-control"
                    id="Frm_Ruangan"
                    value={valDetailOrder.ruangannya}
                    onChange={(e) => handleChange(e)}
                  >
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
                    id="EditTanggalSewa"
                    data-target-input="nearest"
                  >
                    <input
                      type="text"
                      className="form-control datetimepicker-input"
                      data-target="#EditTanggalSewa"
                      defaultValue={valDetailOrder.tglSewa}
                    />
                    <div
                      className="input-group-append"
                      data-target="#EditTanggalSewa"
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
                    id="EditTanggalSelesai"
                    data-target-input="nearest"
                  >
                    <input
                      type="text"
                      className="form-control datetimepicker-input"
                      data-target="#EditTanggalSelesai"
                      defaultValue={valDetailOrder.tglSelesai}
                      onChange={(e) => console.log(e.target.value)}
                    />
                    <div
                      className="input-group-append"
                      data-target="#EditTanggalSelesai"
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
                      id="radioEdit1"
                      name="r1"
                      checked={valDetailOrder.statPembayaran === "Active"}
                      onChange={handleChange}
                    />
                    <label htmlFor="radioEdit1">Active</label>
                  </div>
                  <div
                    className="icheck-sunflower d-inline"
                    style={{ marginRight: 10 }}
                  >
                    <input
                      type="radio"
                      id="radioEdit2"
                      name="r1"
                      checked={
                        valDetailOrder.statPembayaran === "Menunggu Pembayaran"
                      }
                      onChange={handleChange}
                    />
                    <label htmlFor="radioEdit2">Menunggu Pembayaran</label>
                  </div>
                  <div
                    className="icheck-concrete d-inline"
                    style={{ marginRight: 10 }}
                  >
                    <input
                      type="radio"
                      id="radioEdit3"
                      name="r1"
                      checked={valDetailOrder.statPembayaran === "Selesai"}
                      onChange={handleChange}
                    />
                    <label htmlFor="radioEdit3">Selesai</label>
                  </div>
                  <div className="icheck-danger d-inline">
                    <input
                      type="radio"
                      id="radioEdit4"
                      name="r1"
                      checked={valDetailOrder.statPembayaran === "Batal"}
                      onClick={handleChange}
                      onChange={handleChange}
                    />
                    <label htmlFor="radioEdit4">Batal</label>
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
