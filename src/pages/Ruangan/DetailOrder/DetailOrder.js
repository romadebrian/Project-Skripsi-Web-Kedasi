import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
import firebase, { storage } from "../../../config/firebase";
import DateTimePicker from "react-datetime-picker";

import Toast from "../../../component/toast/Toast";
import { Link } from "react-router-dom";

function DetailOrder(props) {
  const [paket, setPaket] = useState("");
  const [totalPaket, setTotalPaket] = useState();
  const [totalPayment, setTotalPayment] = useState(0);

  // const [nameCostumer, setNameCostumer] = useState("");

  const [periksa, setPeriksa] = useState(true);

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

  const [dataBeforeUpdate, setdataBeforeUpdate] = useState({});

  // const [convertTglMulai, setConvertTglMulai] = useState("");
  const [unConvert, setUnConvert] = useState("");

  // console.log("data update", valDetailOrder);

  useEffect(() => {
    if (isloaded === false) {
      // console.log("DetailOrder Props: ", props);

      setLoaded(true);
    }

    // Handle Total Payment
    let ConvertToCurrency = Intl.NumberFormat("en-US");

    if (paket === "PERJAM") {
      setTotalPayment(ConvertToCurrency.format(30000 * totalPaket));
    } else if (paket === "HARIAN") {
      setTotalPayment(ConvertToCurrency.format(100000 * totalPaket));
    } else if (paket === "HARIAN(PELAJAR)") {
      setTotalPayment(ConvertToCurrency.format(75000 * totalPaket));
    } else if (paket === "BULANAN 25JAM") {
      setTotalPayment(ConvertToCurrency.format(450000 * totalPaket));
    } else if (paket === "BULANAN 50JAM") {
      setTotalPayment(ConvertToCurrency.format(650000 * totalPaket));
    } else if (paket === "BULANAN 100JAM") {
      setTotalPayment(ConvertToCurrency.format(900000 * totalPaket));
    } else if (paket === "BULANAN TANPA BATAS") {
      setTotalPayment(ConvertToCurrency.format(1200000 * totalPaket));
    } else {
      setTotalPayment(0);
    }
  }, [isloaded, paket, totalPaket]);

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

      setPaket(data.Paket);
      setTotalPaket(data.JumlahPaket);
      setTotalPayment(data.TotalPembayaran);

      setdataBeforeUpdate({
        OrderId: data.OrderId,
        Paket: data.Paket,
        JumlahPaket: data.JumlahPaket,
        NamaPemesan: data.NamaPemesan,
        Ruangan: data.Ruangan,
        TanggalSewa: data.TanggalSewa,
        TanggalSelesai: data.TanggalSelesai,
        Status: data.Status,
        TotalPembayaran: data.TotalPembayaran,
        BuktiPembayaran: data.BuktiPembayaran,
      });

      if (data.BuktiPembayaran === "") {
        setStatusUpload("Submit Payment");
        setFotoName("Choose File");
        setStyleButton("btn-success");
      } else {
        setStatusUpload("View");
        setFotoName(props.dataDetail.BuktiPembayaran);
        setStyleButton("btn-warning");
      }

      var CurrentDateOrder = data.TanggalSewa;
      var d1 = CurrentDateOrder.split("-");
      var resultConvert = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11

      // console.log(resultConvert);
      setUnConvert(resultConvert);

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

  const checkDateAvaliable = (e) => {
    // console.log(e.nativeEvent.path);
    // console.log(e.nativeEvent.path[5][4].value);
    // console.log(e.target.parentNode.firstChild.offsetParent);

    var paket = valDetailOrder.Paket;

    console.log("paket", paket);
    console.log("total paket", valDetailOrder.JumlahPaket);
    console.log("ruanggannya", valDetailOrder.ruangannya);
    console.log("tgl sewa", unConvert);

    if (
      paket === "" ||
      paket === "--- Casual Coworking ---" ||
      paket === "--- Monthly Coworking ---"
    ) {
      Toast([
        {
          icon: "error",
          title: "Paket pesanan belum di pilih",
        },
      ]);
    }
    // else if (tglMulai === "") {
    //   Toast([
    //     {
    //       icon: "error",
    //       title: "Tanggal sewa tidak boleh kosong",
    //     },
    //   ]);
    // }
    else {
      //////////////////// Colect data from firebase ////////////////////
      return firebase
        .database()
        .ref("/order/")
        .orderByChild("Ruangan")
        .equalTo(valDetailOrder.ruangannya)
        .on("value", (snapshot) => {
          const dataHasil = [];
          if (snapshot.exists()) {
            Object.keys(snapshot.val()).map((key) => {
              dataHasil.push({
                id: key,
                data: snapshot.val()[key],
              });
              return dataHasil;
            });

            // let i1 = 0;

            // do {
            //   if (dataHasil[i1].data.OrderId === valDetailOrder.idOrder) {
            //     console.log("val", dataHasil[i1].data.OrderId);
            //   }

            //   i1++;
            // } while (i1 < dataHasil.length);

            // delete dataHasil[2];

            console.log(dataHasil);
            console.log(dataHasil[0].data.TanggalSewa);
            console.log(dataHasil[0].data.TanggalSelesai);

            //////////////////// Formating Start Date ////////////////////
            console.log("tglMulai ", unConvert);
            let startDay = unConvert;

            let StartDate =
              startDay.getDate() +
              "-" +
              parseInt(startDay.getMonth() + 1) +
              "-" +
              startDay.getFullYear();

            console.log("StartDate ", StartDate);
            // setConvertTglMulai(StartDate);
            setValDetailOrder({
              ...valDetailOrder,
              tglSewa: StartDate,
            });

            //////////////////// Formating Finish Date ////////////////////
            // var IncreseDate = new Date(
            //   "Fri Jul 1 2023 00:00:00 GMT+0700 (Western Indonesia Time)"
            // );

            // var IncreseDate = new Date(unConvert);

            var PickerDate = new Date(unConvert);

            let jmlPaket = Number(totalPaket); //convert string to number
            var IncreseDate = "";

            if (
              paket === "PERJAM" ||
              paket === "HARIAN" ||
              paket === "HARIAN(PELAJAR)"
            ) {
              IncreseDate = PickerDate;
              console.log("Perjam/Perhari");
            } else {
              // IncreseDate.setMonth(IncreseDate.getMonth() + totalPaket);
              IncreseDate = new Date(
                new Date(PickerDate).setMonth(PickerDate.getMonth() + jmlPaket)
              );
            }

            let DateAfterIncresed = IncreseDate;

            let FinishDay =
              DateAfterIncresed.getDate() +
              "-" +
              parseInt(DateAfterIncresed.getMonth() + 1) +
              "-" +
              DateAfterIncresed.getFullYear();

            console.log("FinishDay ", FinishDay);
            // setTglSelesai(FinishDay);
            setValDetailOrder({
              ...valDetailOrder,
              tglSelesai: FinishDay,
            });

            //////////////////// Check Avaliable Start Date ////////////////////
            let i = 0;

            var statusAvaliable = true;

            do {
              if (dataHasil[i].data.OrderId === valDetailOrder.idOrder) {
                console.log(i);
                console.log("current Order", dataHasil[i].data.OrderId);
              } else if (
                dataHasil[i].data.Status === "Batal" ||
                dataHasil[i].data.Status === "Selesai"
              ) {
                console.log(i);
                console.log(
                  "Order ",
                  dataHasil[i].data.OrderId,
                  "Status ",
                  dataHasil[i].data.Status
                );
              } else {
                console.log(i);
                var dateFrom = dataHasil[i].data.TanggalSewa;
                var dateTo = dataHasil[i].data.TanggalSelesai;
                var dateStart = StartDate;
                var dateEnd = FinishDay;

                var d1 = dateFrom.split("-");
                var d2 = dateTo.split("-");
                var c1 = dateStart.split("-");
                var c2 = dateEnd.split("-");

                // console.log(d1);
                // console.log(d2);
                // console.log(c);

                var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
                var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
                var check1 = new Date(c1[2], parseInt(c1[1]) - 1, c1[0]);
                var check2 = new Date(c2[2], parseInt(c2[1]) - 1, c2[0]);

                var resultStart = check1 >= from && check1 <= to;
                var resultStart2 = from >= check1 && from <= check2;

                // var resultEnd = check2 >= from && check2 <= to;
                // var resultEnd = check2 >= from && check2 <= to;

                // console.log("Start", check1);
                // console.log("End", check2);
                // console.log("From ", from);
                // console.log("to", to);

                console.log("resultStart", resultStart);
                console.log("resultStart2", resultStart2);
                // console.log("resultEnd", resultEnd);

                // use or (||) operator
                if (statusAvaliable === true) {
                  if (resultStart === true || resultStart2 === true) {
                    statusAvaliable = false;
                  }
                }
              }

              i++;
            } while (i < dataHasil.length);

            if (statusAvaliable === true) {
              setPeriksa(true);

              Toast([
                {
                  icon: "success",
                  title: `Ruangan tersedia`,
                },
              ]);
            } else {
              setPeriksa(false);
              Toast([
                {
                  icon: "error",
                  title: `Ruangan Pada tanggal ${dateStart} - ${dateEnd} tidak bisa dipesan`,
                },
              ]);
            }
          } else {
            console.log("Data tidak ditemukan");

            //////////////////// Formating Start Date ////////////////////
            console.log("tglMulai ", unConvert);
            let startDay = unConvert;

            let StartDate =
              startDay.getDate() +
              "-" +
              parseInt(startDay.getMonth() + 1) +
              "-" +
              startDay.getFullYear();

            console.log("StartDate ", StartDate);
            // setConvertTglMulai(StartDate);
            setValDetailOrder({
              ...valDetailOrder,
              tglSewa: StartDate,
            });

            //////////////////// Formating Finish Date ////////////////////
            // var IncreseDate = new Date(
            //   "Fri Jul 1 2023 00:00:00 GMT+0700 (Western Indonesia Time)"
            // );

            var IncreseDate2 = new Date(valDetailOrder.tglSewa);

            // var paket = valDetailOrder.Paket;

            if (
              paket === "PERJAM" ||
              paket === "HARIAN" ||
              paket === "HARIAN(PELAJAR)"
            ) {
              console.log("Perjam/Perhari");
            } else {
              IncreseDate2.setMonth(IncreseDate2.getMonth() + totalPaket);
            }

            let DateAfterIncresed = IncreseDate2;

            let FinishDay =
              DateAfterIncresed.getDate() +
              "-" +
              parseInt(DateAfterIncresed.getMonth() + 1) +
              "-" +
              DateAfterIncresed.getFullYear();

            console.log("FinishDay ", FinishDay);
            setValDetailOrder({
              ...valDetailOrder,
              tglSelesai: FinishDay,
            });

            //////////////////// Toast ////////////////////
            setPeriksa(true);
            Toast([
              {
                icon: "success",
                title: `Ruangan tersedia`,
              },
            ]);
          }
        });
    }
  };

  const handleSubmit = async (e) => {
    // var StatusPembayaran;
    e.preventDefault();

    const PrimaryKey = await getPrimaryKey();

    console.log(PrimaryKey);

    console.log("Order Id: ", valDetailOrder.idOrder);
    console.log("Paket: ", paket);
    console.log("Jumlah Paket", totalPaket);
    console.log("Nama Pemesan: ", valDetailOrder.pemesan);
    console.log("Ruangan: ", valDetailOrder.ruangannya);
    console.log("Tanggal Sewa: ", valDetailOrder.tglSewa);
    console.log("Tanggal Selesai: ", valDetailOrder.tglSelesai);
    console.log("Status Pembayaran", valDetailOrder.statPembayaran);
    console.log("Total Pembayaran", totalPayment);
    console.log("Bukti Pembayaran", valDetailOrder.BuktiPembayaran);

    // if (e.target[5].checked === true) {
    //   StatusPembayaran = "Active";
    //   console.log("Active");
    // } else if (e.target[6].checked === true) {
    //   StatusPembayaran = "Menunggu Pembayaran";
    //   console.log("Menunggu Pembayaran");
    // } else if (e.target[7].checked === true) {
    //   StatusPembayaran = "Selesai";
    //   console.log("Selesai");
    // } else if (e.target[8].checked === true) {
    //   StatusPembayaran = "Batal";
    //   console.log("Batal");
    // } else {
    //   console.log("error");
    // }

    if (valDetailOrder.pemesan === "") {
      Toast([
        {
          icon: "error",
          title: "Nama pemesan tidak boleh kosong",
        },
      ]);
    } else if (periksa === false) {
      Toast([
        {
          icon: "error",
          title: "Anda harus memeriksa ketersediaan ruangan kembali",
        },
      ]);
    } else {
      Toast([
        {
          icon: "success",
          title: "berhasil",
        },
      ]);

      firebase
        .database()
        .ref("order/" + PrimaryKey)
        .set(
          {
            OrderId: valDetailOrder.idOrder,
            Paket: paket,
            JumlahPaket: totalPaket,
            NamaPemesan: valDetailOrder.pemesan,
            Ruangan: valDetailOrder.ruangannya,
            TanggalSewa: valDetailOrder.tglSewa,
            TanggalSelesai: valDetailOrder.tglSelesai,
            Status: valDetailOrder.statPembayaran,
            TotalPembayaran: totalPayment,
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
                valDetailOrder.idOrder,
                paket,
                totalPaket,
                valDetailOrder.pemesan,
                valDetailOrder.ruangannya,
                valDetailOrder.tglSewa,
                valDetailOrder.tglSelesai,
                valDetailOrder.statPembayaran,
                totalPayment,
                valDetailOrder.BuktiPembayaran
              );
              // window.location.reload();
            }
          }
        );

      window.$("#form-edit").modal("hide");

      // window.location.reload();
    }
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
                      OrderId: dataBeforeUpdate.OrderId,
                      Paket: dataBeforeUpdate.Paket,
                      JumlahPaket: dataBeforeUpdate.JumlahPaket,
                      NamaPemesan: dataBeforeUpdate.NamaPemesan,
                      Ruangan: dataBeforeUpdate.Ruangan,
                      TanggalSewa: dataBeforeUpdate.TanggalSewa,
                      TanggalSelesai: dataBeforeUpdate.TanggalSelesai,
                      Status: dataBeforeUpdate.Status,
                      TotalPembayaran: dataBeforeUpdate.TotalPembayaran,

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
                            title: "Bukti Pembayaran Berhasil Di Upload",
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
    } else if (statusUpload === "Submit Payment") {
      document.getElementById("InputPaymentFoto").click();
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

  // const convertTanggal = (val) => {};

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
              <Link to="/print" target="_blank">
                <i className="fa fa-print float-right"></i>
              </Link>
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
                  <label>Paket</label>
                  <div className="input-group" id="Paket">
                    <select
                      className="form-control"
                      value={paket}
                      onChange={(e) => {
                        // setValDetailOrder({
                        //   ...valDetailOrder,
                        //   Paket: e.target.value,
                        // });
                        setPaket(e.target.value);
                        setPeriksa(false);
                      }}
                    >
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
                        onChange={(e) => {
                          setTotalPaket(e.target.value);
                          setPeriksa(false);
                        }}
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
                    placeholder="Nama Panjang"
                    defaultValue={valDetailOrder.pemesan}
                    onChange={(e) =>
                      setValDetailOrder({
                        ...valDetailOrder,
                        pemesan: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Ruangan</label>
                  <select
                    className="form-control"
                    id="Frm_Ruangan"
                    value={valDetailOrder.ruangannya}
                    onChange={(e) => {
                      handleChange(e);
                      setPeriksa(false);
                    }}
                  >
                    <option>ROOM 000</option>
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
                    <DateTimePicker
                      className="form-control "
                      value={unConvert}
                      format={"dd-MM-y"}
                      onChange={(e) => {
                        // setValDetailOrder({
                        //   ...valDetailOrder,
                        //   tglSewa: e,
                        // });
                        setUnConvert(e);
                        setPeriksa(false);
                      }}
                    />
                    <div className="input-group-append">
                      <div
                        className="input-group-text"
                        onClick={(e) => checkDateAvaliable(e)}
                      >
                        <i className="fa fa-search" />
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

              {/* <div style={{ marginRight: "10px", color: "green" }}>
                <h3 className="float-right">
                  Total Rp {valDetailOrder.totalPayment}
                </h3>
              </div> */}

              <div
                className="d-flex  flex-row-reverse "
                style={{ marginRight: "10px", color: "green" }}
              >
                <h3>Total Rp {totalPayment}</h3>
              </div>

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
                          <i className="far fa-credit-card" />
                          &nbsp;
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
                          <b>{fotoName}</b>
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
