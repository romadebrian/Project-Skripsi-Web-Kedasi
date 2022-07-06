import React, { useEffect, useState } from "react";
import firebase from "../../../config/firebase";
firebase.setLogLevel("silent");

function Invoice() {
  const [orderDetail, setOrderDetail] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [invoiceID, setInvoiceID] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [subTotal, setSubTotal] = useState();

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
          setSubTotal("30,000");
          // setTotalPayment(ConvertToCurrency.format(30000 * totalPaket));
        } else if (paket === "HARIAN") {
          setSubTotal("100,000");
          // setTotalPayment(ConvertToCurrency.format(100000 * totalPaket));
        } else if (paket === "HARIAN(PELAJAR)") {
          setSubTotal("75.000");
          // setTotalPayment(ConvertToCurrency.format(75000 * totalPaket));
        } else if (paket === "BULANAN 25JAM") {
          setSubTotal("450,000");
          // setTotalPayment(ConvertToCurrency.format(450000 * totalPaket));
        } else if (paket === "BULANAN 50JAM") {
          setSubTotal("650,000");
          // setTotalPayment(ConvertToCurrency.format(650000 * totalPaket));
        } else if (paket === "BULANAN 100JAM") {
          setSubTotal("900,000");
          // setTotalPayment(ConvertToCurrency.format(900000 * totalPaket));
        } else if (paket === "BULANAN TANPA BATAS") {
          setSubTotal("1,200,000");
          // setTotalPayment(ConvertToCurrency.format(1200000 * totalPaket));
        } else {
          setSubTotal("0");
        }
      }
    };

    createInvoiceID();
    convertRoom();
    getPriceRoom();
  }, [isLoad, orderDetail]);

  const getDataOrder = async () => {
    const idPesanan = "ORD0010";

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
                    <small className="float-right">Date: 2/10/2014</small>
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
                  <b>Payment Due:</b> 2/22/2014
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
                        <th>Lama Sewa</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{orderDetail.JumlahPaket}</td>
                        <td>
                          Sewa Ruangan {roomNumber}
                          {orderDetail.Paket}
                        </td>
                        <td>7 Days</td>
                        <td>Rp {subTotal}</td>
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
                  <p className="lead">Amount Due 2/22/2014</p>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th style={{ width: "50%" }}>Subtotal:</th>
                          <td>Rp.{orderDetail.TotalPembayaran}</td>
                        </tr>
                        <tr>
                          <th>Tax (10%)</th>
                          <td>Rp.100.000</td>
                        </tr>
                        <tr>
                          <th>Total:</th>
                          <td>Rp.1.100.000</td>
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
                  <button type="button" className="btn btn-success float-right">
                    <i className="far fa-credit-card" /> Submit Payment
                  </button>
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
