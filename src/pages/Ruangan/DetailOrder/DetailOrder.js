import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
import firebase, { storage } from "../../../config/firebase";

import Toast from "../../../component/toast/Toast";

function DetailOrder(props) {
  const [isloaded, setLoaded] = useState(false);
  const [fileFoto, setFileFoto] = useState("");
  const [fotoName, setFotoName] = useState("");
  const [statusUpload, setStatusUpload] = useState("");
  const [FileType, setFileType] = useState("");
  const [styleButton, setStyleButton] = useState("btn-success");

  const [valDetailOrder, setValDetailOrder] = useState({
    idOrder: "",
    pemesan: "",
    ruangannya: "",
    tglSewa: "",
    tglSelesai: "",
    statPembayaran: "",
    BuktiPembayaran: "",
  });

  // console.log("data update", valDetailOrder);

  useEffect(() => {
    window.$("#EditTanggalSewa").datetimepicker({
      format: "DD-MM-YYYY",
    });
    window.$("#EditTanggalSelesai").datetimepicker({
      format: "DD-MM-YYYY",
    });

    if (isloaded === false) {
      // console.log("DetailOrder Props: ", props);

      setLoaded(true);
    }

    // metodeGetData();
  }, [isloaded]);

  const handleSubmit = async (e) => {
    var StatusPembayaran;
    e.preventDefault();

    const PrimaryKey = await getPrimaryKey();

    console.log(PrimaryKey);

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
      .ref("order/" + PrimaryKey)
      .set(
        {
          OrderId: e.target[0].value,
          NamaPemesan: e.target[1].value,
          Ruangan: e.target[2].value,
          TanggalSewa: e.target[3].value,
          TanggalSelesai: e.target[4].value,
          Status: StatusPembayaran,
          BuktiPembayaran: valDetailOrder.BuktiPembayaran,
        },
        (error) => {
          if (error) {
            // The write failed...
            alert("Gagal Simpan");
          } else {
            // Data saved successfully!
            // alert("Order Berhasil Di Simpan");

            Toast([
              {
                icon: "success",
                title: "Perbaruan Pemesanan Ruangan Berhasil",
              },
            ]);

            console.log(
              "send value: ",
              e.target[0].value,
              e.target[1].value,
              e.target[2].value,
              e.target[3].value,
              e.target[4].value,
              StatusPembayaran,
              valDetailOrder.BuktiPembayaran
            );
            // window.location.reload();
          }
        }
      );

    window.$("#form-edit").modal("hide");
  };

  const getPrimaryKey = () => {
    return new Promise((resolve) => {
      const idPesanan = valDetailOrder.idOrder;
      return firebase
        .database()
        .ref("/order/")
        .orderByChild("OrderId")
        .equalTo(idPesanan)
        .once("value", (snapshot) => {
          Object.keys(snapshot.val()).map((key) => {
            // console.log(key);
            resolve(key);
            return key;
          });
        });
    });
  };

  const metodeGetData = () => {
    if (props.editStatus === true) {
      const data = props.dataDetail;

      // props.editFunction();
      console.log("Datanya", data);

      setValDetailOrder({
        idOrder: data.OrderId,
        pemesan: data.NamaPemesan,
        ruangannya: data.Ruangan,
        tglSewa: data.TanggalSewa,
        tglSelesai: data.TanggalSelesai,
        statPembayaran: data.Status,
        BuktiPembayaran: data.BuktiPembayaran,
      });

      if (data.BuktiPembayaran === "") {
        setStatusUpload("Add File");
        setFotoName("Choose File");
        setStyleButton("btn-success");
      } else {
        setStatusUpload("View");
        setFotoName(props.dataDetail.BuktiPembayaran);
        setStyleButton("btn-warning");
      }

      props.disableModeEdit();
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

  const fileSelectHandler = (event) => {
    console.log(event.target.files[0]);
    setFileFoto(event.target.files[0]);
    setFotoName(event.target.files[0]?.name);
    setStatusUpload("Upload");
    setStyleButton("btn-primary");

    if (event.target.files[0].type === "image/png") {
      setFileType(".png");
    } else if (event.target.files[0].type === "image/jpeg") {
      setFileType(".jpeg");
    } else if (event.target.files[0].type === "image/jpg") {
      setFileType(".jpg");
    }

    // console.log(event.target.files[0].type);
  };

  const handleUploadFoto = async (e) => {
    const PrimaryKey = await getPrimaryKey();

    if (statusUpload === "Upload") {
      if (fileFoto === "") {
        console.log("Foto belum  di pilih");
        Toast([{ icon: "error", title: "File belum di pilih" }]);
      } else {
        // console.log(image.name);

        // Save foto to firebase storage
        const fileName = props.dataDetail.OrderId + FileType;
        const uploadTask = storage.ref(`payment/${fileName}`).put(fileFoto);

        // Get Status Upload
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setFotoName(progress + " %");
            setStatusUpload("Uploading");
            setStyleButton("btn-danger");
            console.log(progress + " %");
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("payment")
              .child(fileName)
              .getMetadata()
              .then((MetaDataFoto) => {
                // Update Data Firebase
                firebase
                  .database()
                  .ref("order/" + PrimaryKey)
                  .set(
                    {
                      OrderId: valDetailOrder.idOrder,
                      NamaPemesan: valDetailOrder.pemesan,
                      Ruangan: valDetailOrder.ruangannya,
                      TanggalSewa: valDetailOrder.tglSewa,
                      TanggalSelesai: valDetailOrder.tglSelesai,
                      Status: valDetailOrder.statPembayaran,
                      BuktiPembayaran: MetaDataFoto.name,
                    },
                    (error) => {
                      if (error) {
                        // The write failed...
                        alert("Gagal Simpan Ke Database");
                      } else {
                        // Data saved successfully!
                        Toast([
                          {
                            icon: "success",
                            title: "Pesanan berhasil di perbarui 1.",
                          },
                        ]);

                        // console.log(valDetailOrder.BuktiPembayaran);

                        setValDetailOrder({
                          ...valDetailOrder,
                          BuktiPembayaran: MetaDataFoto.name,
                        });

                        setFileFoto(null);
                        setStatusUpload("View");
                        setFotoName(fileName);
                        setStyleButton("btn-warning");
                      }
                    }
                  );
              });
          }
        );

        // toastSucces();
      }
    } else if (statusUpload === "View") {
      openFoto();
    } else if (statusUpload === "Add File") {
    } else if (statusUpload === "Uploading") {
    }
  };

  // const toastProgressUpload = async (val) => {
  //   let progress = getVal();
  //   console.log("progressnya", progress);

  //   var Toast = Swal.mixin({
  //     toast: true,
  //     position: "top-end",
  //     showConfirmButton: false,
  //     timer: 3000,
  //     timerProgressBar: true,
  //   });

  //   Toast.fire({
  //     icon: "success",
  //     title: progress,
  //   });
  // };

  const openFoto = (name) => {
    storage
      .ref("payment")
      .child(props.dataDetail.BuktiPembayaran)
      .getDownloadURL()
      .then((url) => {
        window.open(url, "_blank", "noopener,noreferrer");
      });
  };

  return (
    <div
      className="detailorder modal fade "
      id="form-edit"
      onMouseEnter={metodeGetData}
    >
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
                <div className="row">
                  <div className="col-3">
                    <button type="submit" className="btn btn-primary">
                      Update
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

                  <div className="input-group d-block col-9">
                    <div className="row d-flex flex-row-reverse">
                      <div className="input-group-append">
                        <span
                          // className="btn btn-success"
                          className={`btn ${styleButton}`}
                          onClick={handleUploadFoto}
                        >
                          {statusUpload}
                        </span>
                      </div>
                      <div className="custom-file col-6">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="InputPaymentFoto"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={fileSelectHandler}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="exampleInputFile"
                        >
                          {fotoName}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
