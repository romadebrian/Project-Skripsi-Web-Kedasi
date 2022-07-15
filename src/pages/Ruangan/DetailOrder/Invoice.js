import React, { Fragment, useEffect, useState } from "react";
import firebase, { storage } from "../../../config/firebase";
import Toast from "../../../component/toast/Toast";
firebase.setLogLevel("silent");

function Invoice() {
  const [orderDetail, setOrderDetail] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [invoiceID, setInvoiceID] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [Price, setPrice] = useState();
  const [durasi, setDurasi] = useState();
  const [dateDue, setDateDue] = useState("");
  const [dateNow, setDateNow] = useState("");

  const [statusUpload, setStatusUpload] = useState("Submit Payment");
  // const [uploadMode, setUploadMode] = useState(false);
  const [FileDetail, setFileDetail] = useState();
  const [styleButton, setStyleButton] = useState("btn-success");

  useEffect(() => {
    if (isLoad === false) {
      getDataOrder();
      setIsLoad(true);
    } else {
      console.log(orderDetail);
    }

    const createInvoiceID = () => {
      var idPesanan = orderDetail.OrderId;

      if (idPesanan != null) {
        // Comvert to Number
        var arrA = Array.from(idPesanan);
        arrA.splice(0, 3);
        var convertA = Number(arrA.join(""));
        // console.log(convertA);

        // Formating ke 00000
        var str = "" + convertA;
        var pad = "000000";
        var ans = pad.substring(0, pad.length - str.length) + str;
        // console.log(ans);

        setInvoiceID(ans);
      } else {
        // console.log("kosong");
      }
    };

    const convertRoom = () => {
      var IDRuangan = orderDetail.Ruangan;

      if (IDRuangan != null) {
        // Comvert to Number
        var arrA = Array.from(IDRuangan);
        arrA.splice(0, 5);
        var convertA = Number(arrA.join(""));
        // console.log(convertA);

        setRoomNumber(convertA);
      }
    };

    const getPriceRoom = () => {
      var paket = orderDetail.Paket;
      if (paket != null) {
        if (paket === "PERJAM") {
          setPrice("30,000");
          // setTotalPayment(ConvertToCurrency.format(30000 * totalPaket));
        } else if (paket === "HARIAN") {
          setPrice("100,000");
          // setTotalPayment(ConvertToCurrency.format(100000 * totalPaket));
        } else if (paket === "HARIAN(PELAJAR)") {
          setPrice("75.000");
          // setTotalPayment(ConvertToCurrency.format(75000 * totalPaket));
        } else if (paket === "BULANAN 25JAM") {
          setPrice("450,000");
          // setTotalPayment(ConvertToCurrency.format(450000 * totalPaket));
        } else if (paket === "BULANAN 50JAM") {
          setPrice("650,000");
          // setTotalPayment(ConvertToCurrency.format(650000 * totalPaket));
        } else if (paket === "BULANAN 100JAM") {
          setPrice("900,000");
          // setTotalPayment(ConvertToCurrency.format(900000 * totalPaket));
        } else if (paket === "BULANAN TANPA BATAS") {
          setPrice("1,200,000");
          // setTotalPayment(ConvertToCurrency.format(1200000 * totalPaket));
        } else {
          setPrice("0");
        }
      }
    };

    const getDurasi = () => {
      if (orderDetail.TanggalSewa != null) {
        var dateFrom = orderDetail.TanggalSewa;
        var dateTo = orderDetail.TanggalSelesai;

        var d1 = dateFrom.split("-");
        var d2 = dateTo.split("-");

        var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
        var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);

        var Difference_In_Time = to.getTime() - from.getTime();

        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        var Difference_In_Month = Math.floor(Difference_In_Days / 30);

        var Difference_In_Year = Math.floor(Difference_In_Month / 12);

        if (Difference_In_Year !== 0) {
          // console.log(Difference_In_Year, "Year");
          setDurasi(Difference_In_Year + " Year");
        } else if (Difference_In_Month !== 0) {
          // console.log(Difference_In_Month, "Month");
          setDurasi(Difference_In_Month + " Month");
        } else if (Difference_In_Days !== 0) {
          // console.log(Difference_In_Days, "Days");
          setDurasi(Difference_In_Days + " Days");
        } else {
          console.log("Error");
        }
      }
    };

    const getStatusPayment = () => {
      if (orderDetail.BuktiPembayaran != null) {
        if (orderDetail.BuktiPembayaran === "") {
          setStatusUpload("Submit Payment");
        } else {
          setStatusUpload("View");
        }
      }
    };

    const formatingPaymentDue = () => {
      if (orderDetail.JatuhTempo != null) {
        var DateD = new Date(orderDetail.JatuhTempo);
        let DDue =
          DateD.getDate() +
          "/" +
          parseInt(DateD.getMonth() + 1) +
          "/" +
          DateD.getFullYear();

        setDateDue(DDue);
      }
    };

    const FormatingDateNow = () => {
      var tglSekarang = new Date();
      let TglSrg =
        tglSekarang.getDate() +
        "/" +
        parseInt(tglSekarang.getMonth() + 1) +
        "/" +
        tglSekarang.getFullYear();

      setDateNow(TglSrg);
    };

    createInvoiceID();
    convertRoom();
    getPriceRoom();
    getDurasi();
    getStatusPayment();
    formatingPaymentDue();
    FormatingDateNow();
  }, [isLoad, orderDetail]);

  const getDataOrder = async () => {
    const idPesanan = "ORD0029";

    console.log(idPesanan);

    return firebase
      .database()
      .ref("/order/")
      .orderByChild("OrderId")
      .equalTo(idPesanan)
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
        } else {
          console.log("Data tidak ditemukan");
        }

        // console.log(dataHasil[0].data);
        // this.setState({ orderDetail: dataHasil[0].data });
        setOrderDetail(dataHasil[0].data);
      });
  };

  const thisFileUpload = () => {
    if (statusUpload === "Submit Payment") {
      document.getElementById("fileUpload").click();
    } else if (statusUpload === "Upload") {
      handleUploadFoto();
    }
  };

  const fileSelectHandler = (event) => {
    console.log(event.target.files[0]);
    // setFileFoto(event.target.files[0]);
    // setFotoName(event.target.files[0]?.name);

    setStatusUpload("Upload");
    setStyleButton("btn-primary");
    // setUploadMode(true);

    if (event.target.files[0].type === "image/png") {
      // setFileType(".png");
      setFileDetail({
        Filenya: event.target.files[0],
        NamaFile: event.target.files[0]?.name,
        Type: ".png",
      });
    } else if (event.target.files[0].type === "image/jpeg") {
      // setFileType(".jpeg");
      setFileDetail({
        Filenya: event.target.files[0],
        NamaFile: event.target.files[0]?.name,
        Type: ".jpeg",
      });
    } else if (event.target.files[0].type === "image/jpg") {
      // setFileType(".jpg");
      setFileDetail({
        Filenya: event.target.files[0],
        NamaFile: event.target.files[0]?.name,
        Type: ".jpg",
      });
    }
  };

  const getPrimaryKey = () => {
    return new Promise((resolve) => {
      const idPesanan = orderDetail.OrderId;
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

  const handleUploadFoto = async (e) => {
    const PrimaryKey = await getPrimaryKey();

    if (statusUpload === "Upload") {
      if (FileDetail.Filenya != null) {
        // console.log(image.name);

        // Save foto to firebase storage
        const fileName = orderDetail.OrderId + FileDetail.Type;
        const uploadTask = storage
          .ref(`payment/${fileName}`)
          .put(FileDetail.Filenya);

        // Get Status Upload
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // setFotoName(progress + " %");
            setStatusUpload("Uploading", progress + " %");
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
                      OrderId: orderDetail.OrderId,
                      Paket: orderDetail.Paket,
                      JumlahPaket: orderDetail.JumlahPaket,
                      NamaPemesan: orderDetail.NamaPemesan,
                      Ruangan: orderDetail.Ruangan,
                      TanggalSewa: orderDetail.TanggalSewa,
                      TanggalSelesai: orderDetail.TanggalSelesai,
                      Status: orderDetail.Status,
                      TotalPembayaran: orderDetail.TotalPembayaran,

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

                        setOrderDetail({
                          ...orderDetail,
                          BuktiPembayaran: MetaDataFoto.name,
                        });

                        setFileDetail({ ...FileDetail, Filenya: null });
                        setStatusUpload("View");
                        // setFotoName(fileName);
                        setStyleButton("btn-warning");
                      }
                    }
                  );
              });
          }
        );

        // toastSucces();
      } else {
        console.log("Foto belum  di pilih");
        Toast([{ icon: "error", title: "File belum di pilih" }]);
      }
    } else if (statusUpload === "View") {
    } else if (statusUpload === "Submit Payment") {
    } else if (statusUpload === "Uploading") {
    }
  };

  const viewPayment = () => {
    storage
      .ref("payment")
      .child(orderDetail.BuktiPembayaran)
      .getDownloadURL()
      .then((url) => {
        window.open(url, "_blank", "noopener,noreferrer");
      });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            {/* Main content */}
            <div className="invoice p-3 mb-3">
              {/* title row */}
              <div className="row">
                <div className="col-12">
                  <h4>
                    <img
                      src="dist/img/logo-header-coklat.png"
                      alt="Logo Head"
                      style={{ height: "auto", width: 300 }}
                    />
                    <small className="float-right">Date: {dateNow} </small>
                  </h4>
                </div>
                {/* /.col */}
              </div>
              {/* info row */}
              <div className="row invoice-info">
                <div className="col-sm-4 invoice-col">
                  From
                  <address>
                    <strong>Kedasi | Tanjung Duren</strong>
                    <br />
                    Jl. Tanjung Duren Timur 6 No.2A, RT.7/RW.3, Tj. Duren
                    Selatan, Grogol petamburan,
                    <br />
                    Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470
                    <br />
                    Phone: 081808389450
                    <br />
                    Email: ask@kedasi.co.id
                  </address>
                </div>
                {/* /.col */}
                <div className="col-sm-4 invoice-col">
                  To
                  <address>
                    <strong>{orderDetail.NamaPemesan}</strong>
                    <br />
                    Jl,GG Haji Awi, RT.6/RW.12, Jatiasih
                    <br />
                    Pondok Gede, Bekasi 117413
                    <br />
                    Phone: 083877434091
                    <br />
                    Email: romadebrian04@yahoo.co.id
                  </address>
                </div>
                {/* /.col */}
                <div className="col-sm-4 invoice-col">
                  <b>Invoice #{invoiceID}</b>
                  <br />
                  <br />
                  <b>Order ID:</b> {orderDetail.OrderId}
                  <br />
                  <b>Payment Due:</b> {dateDue}
                  <br />
                  <b>Account:</b> 968-34567
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
              {/* Table row */}
              <div className="row">
                <div className="col-12 table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Qty</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{orderDetail.JumlahPaket}</td>
                        <td>
                          Sewa Ruangan {roomNumber}&nbsp;
                          {orderDetail.Paket}
                        </td>
                        <td>Rp {Price}</td>
                        <td>{durasi}</td>
                        <td>Rp {orderDetail.TotalPembayaran}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
              <div className="row">
                {/* accepted payments column */}
                <div className="col-6"></div>
                {/* /.col */}
                <div className="col-6">
                  <p className="lead">Amount Due {dateDue}</p>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        {/* <tr>
                          <th style={{ width: "50%" }}>Subtotal:</th>
                          <td>Rp {Price}</td>
                        </tr>
                        <tr>
                          <th>Tax (10%)</th>
                          <td>{orderDetail.JumlahPaket}</td>
                        </tr> */}
                        <tr>
                          <th>Total:</th>
                          <td>Rp {orderDetail.TotalPembayaran}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
              {/* this row will not appear when printing */}
              <div className="row no-print">
                <div className="col-12">
                  <a
                    href="invoice-print.html"
                    rel="noopener"
                    target="_blank"
                    className="btn btn-default"
                  >
                    <i className="fas fa-print" /> Print
                  </a>
                  {statusUpload === "View" ? (
                    <button
                      type="button"
                      className={`btn ${styleButton} float-right`}
                      onClick={viewPayment}
                    >
                      <i className="far fa-credit-card" /> View Payment
                    </button>
                  ) : (
                    // <button
                    //   type="button"
                    //   className="btn btn-success float-right"
                    // >
                    //   <i className="far fa-credit-card" /> Submit Payment
                    // </button>
                    <Fragment>
                      <input
                        type="file"
                        id="fileUpload"
                        style={{ display: "none" }}
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={fileSelectHandler}
                      />
                      <button
                        className="btn btn-success float-right"
                        onClick={thisFileUpload}
                      >
                        <i className="far fa-credit-card" /> {statusUpload}
                      </button>
                    </Fragment>
                  )}

                  <button
                    type="button"
                    className="btn btn-primary float-right"
                    style={{ marginRight: 5 }}
                  >
                    <i className="fas fa-download" /> Generate PDF
                  </button>
                </div>
              </div>
            </div>
            {/* /.invoice */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container-fluid */}
    </section>
  );
}

export default Invoice;
