import React, { Fragment, useCallback, useEffect, useState } from "react";
import firebase, { storage } from "../../../config/firebase";
import Toast from "../../../component/toast/Toast";
// import { DataInvoice } from "../../../config/context/Context";
// import { Link } from "react-router-dom";
import { FormattingDateTime } from "../../../config/formattingDateTime";
firebase.setLogLevel("silent");

function Invoice(props) {
  const [orderDetail, setOrderDetail] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [invoiceID, setInvoiceID] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [Price, setPrice] = useState();
  const [durasi, setDurasi] = useState();
  const [dateDue, setDateDue] = useState("");
  const [dateNow, setDateNow] = useState("");

  const [dataUser, setDataUser] = useState();

  const [statusUpload, setStatusUpload] = useState("Submit Payment");
  // const [uploadMode, setUploadMode] = useState(false);
  const [FileDetail, setFileDetail] = useState();
  const [styleButton, setStyleButton] = useState("btn-success");

  const handleGetDataUser = useCallback(() => {
    const idPesanan = JSON.parse(localStorage.getItem("OrderId"));
    // const idPesanan = "ORD0067";

    // Listing all user
    return firebase
      .database()
      .ref("users")
      .once("value", (snapshot) => {
        // console.log(snapshot.val());
        Object.keys(snapshot.val()).map((key) => {
          // console.log(key);

          // cari orderID di dalam order user
          return firebase
            .database()
            .ref("users/" + key + "/order")
            .orderByChild("OrderId")
            .equalTo(idPesanan)
            .once("value", (result) => {
              // Jika ketemu, maka kumpulkan data user berdasarkan key user yang sekarang sedang di loop
              if (result.exists()) {
                console.log(result.val());
                console.log(key);
                return firebase
                  .database()
                  .ref("users/" + key)
                  .once("value", (resultdatauser) => {
                    console.log(resultdatauser.val());
                    setDataUser({
                      iduser: key,
                      address: resultdatauser.val().Nama,
                      phone: resultdatauser.val().Telepon,
                      email: resultdatauser.val().Email,
                      token: resultdatauser.val()?.TokenNotif,
                    });
                  });
              }
            });
        });
      });
  }, []);

  useEffect(() => {
    // console.log(props);

    const getDataOrder = () => {
      const idPesanan = JSON.parse(localStorage.getItem("OrderId"));

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
        var dateData = `${orderDetail.JatuhTempo}`;

        const arr = dateData.split("");
        let totArr = arr.length;

        for (let i = 0; i < totArr; i++) {
          // console.log(arr[i]);
          if (arr[i] === "-") {
            arr[i] = "/";
          }
        }

        let joins = arr.join("");

        setDateDue(joins);
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

    if (isLoad === false) {
      getDataOrder();
      handleGetDataUser();
      setIsLoad(true);
    }

    createInvoiceID();
    convertRoom();
    getPriceRoom();
    getDurasi();
    getStatusPayment();
    formatingPaymentDue();
    FormatingDateNow();
  }, [isLoad, orderDetail, props, handleGetDataUser]);

  const thisFileUpload = () => {
    // props.value.setKode("ORD0025");

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
            setStatusUpload(`Uploading... ${progress} %`);
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
                        handleCreateRemoteNotification();
                        handleCreateNotificationToDatabase();
                        Toast([
                          {
                            icon: "success",
                            title: "Bukti Pembayaran Berhasil Di Upload",
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
                        // setStyleButton("btn-warning");
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

  const handlePrint = () => {
    window.addEventListener("load", window.print());
  };

  const handleCreateRemoteNotification = async () => {
    const to = dataUser?.token;
    const myData = {
      to: to,
      priority: "high",
      notification: {
        title: "Konfirmasi Pembayaran",
        body: `Pesanan anda dengan OrderId ${orderDetail.OrderId} telah dikonfirmasi pembayarannya`,
      },

      data: {
        Action: "CheckOut",
        OrderID: orderDetail.OrderId,
      },
    };

    const result = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization:
          "key=AAAA6jj0k_w:APA91bFVagvVrQ1UsvzH-GglbdFAzvfuGhE1A6KABx3Y3QdiiyKNba9RG6zAkYqm3oAd23M-l7BuhzatGHAOHln6L2lho1ZrhMUM5DB678r2Z9_Bd79z46HCiezO9q9zD6CaiTa_h6C2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myData),
    }).then(console.log(myData));

    const resultJson = await result.json();
    console.log(resultJson);
  };

  const handleCreateNotificationToDatabase = async () => {
    var DateTimeNow = FormattingDateTime(new Date());

    var postListRef = firebase
      .database()
      .ref(`users/${dataUser.iduser}/notifikasi`);
    var newPostRef = postListRef.push();
    await newPostRef.set(
      {
        Aksi: "CheckOut",
        Date: DateTimeNow,
        Isi: `Pesanan anda dengan OrderId ${orderDetail.OrderId} telah dikonfirmasi pembayarannya`,
        Judul: "Konfirmasi Pembayaran",
        Meta_Data: orderDetail.OrderId,
        Status: "Unread",
        Target: dataUser.iduser,
      },
      (error) => {
        if (error) {
          alert("Gagal Simpan");
        }
      }
    );

    return null;
  };

  useEffect(() => {
    console.log(dataUser);
  }, [dataUser]);

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
                    Address: {dataUser?.address}
                    <br />
                    Phone: {dataUser?.phone}
                    <br />
                    Email: {dataUser?.email}
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
                  <b>Account:</b> {dataUser?.iduser}
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
                  <button
                    // to="invoice-print"
                    // rel="noopener"
                    // target="_blank"
                    className="btn btn-default"
                    onClick={handlePrint}
                  >
                    <i className="fas fa-print" /> Print
                  </button>
                  {statusUpload === "View" ? (
                    <button
                      type="button"
                      className={`btn btn-warning float-right`}
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
                        className={`btn ${styleButton} float-right`}
                        onClick={thisFileUpload}
                      >
                        {statusUpload !== "Upload" &&
                        statusUpload !== "View" &&
                        statusUpload !== "Submit Payment" ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : statusUpload === "Upload" ? (
                          <i className="fas fa-upload" />
                        ) : (
                          <i className="far fa-credit-card" />
                        )}
                        &nbsp;
                        {statusUpload}
                      </button>
                    </Fragment>
                  )}

                  {/* <button
                    type="button"
                    className="btn btn-primary float-right"
                    style={{ marginRight: 5 }}
                  >
                    <i className="fas fa-download" /> Generate PDF
                  </button> */}
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
