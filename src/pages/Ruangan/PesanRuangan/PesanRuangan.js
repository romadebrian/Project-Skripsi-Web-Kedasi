import React from "react"; //rfce
import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
import firebase from "../../../config/firebase";
import DateTimePicker from "react-datetime-picker";
import Toast from "../../../component/toast/Toast";
// import Ruangan from "../Ruangan";

function PesanRuangan(props) {
  const [isloaded, setLoaded] = useState(false);

  const [paket, setPaket] = useState("");
  const [totalPaket, setTotalPaket] = useState("1");
  const [nameCostumer, setNameCostumer] = useState("");
  const [room, setRoom] = useState("ROOM 000");

  // const [tanggalSekarang, setTanggalSekarang] = useState("");
  const [tglMulai, setTglMulai] = useState("");
  const [convertTglMulai, setConvertTglMulai] = useState("");
  const [tglSelesai, setTglSelesai] = useState("");

  const [periksa, setPeriksa] = useState();

  const [statusPembayaran, setStatusPembayaran] = useState("Active");

  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    // window.$("#TanggalSewa").datetimepicker({
    //   format: "DD-MM-YYYY",
    // });
    // window.$("#TanggalSelesai").datetimepicker({
    //   format: "DD-MM-YYYY",
    // });

    // function convertTanggalSekarang() {
    //   let hariini = new Date();

    //   let tgl =
    //     hariini.getDate() +
    //     "-" +
    //     parseInt(hariini.getMonth() + 1) +
    //     "-" +
    //     hariini.getFullYear();

    //   setTanggalSekarang(hariini);
    // }

    if (isloaded === false) {
      // convertTanggalSekarang();

      // console.log(new Date());

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

    // console.log(paket);
  }, [isloaded, paket, totalPaket]);

  const handleSubmit = async (e) => {
    // var StatusPembayaran;
    const TanggalTempo = await paymentDue();
    let jatuhTempo = TanggalTempo.toString();
    e.preventDefault();

    console.log(e);

    console.log("Order Id: ", e.target[0].value);
    console.log("Paket: ", paket);
    console.log("Jumlah Paket: ", totalPaket);
    console.log("Nama Costumer: ", e.target[3].value);
    console.log("Ruangan: ", e.target[4].value);
    console.log("Tanggal Mulai: ", convertTglMulai);
    console.log("Tanggal Selesai: ", tglSelesai);
    console.log("StatusPembayaran: ", statusPembayaran);
    console.log("Total Pembayaran", totalPayment);
    console.log("Jatuh Tempo", jatuhTempo);

    // if (e.target[58].checked === true) {
    //   StatusPembayaran = "Active";
    //   console.log("Active");
    // } else if (e.target[59].checked === true) {
    //   StatusPembayaran = "Menunggu Pembayaran";
    //   console.log("Menunggu Pembayaran");
    // } else if (e.target[60].checked === true) {
    //   StatusPembayaran = "Selesai";
    //   console.log("Selesai");
    // } else if (e.target[61].checked === true) {
    //   StatusPembayaran = "Batal";
    //   console.log("Batal");
    // } else {
    //   console.log("error");
    // }

    if (nameCostumer === "") {
      Toast([
        {
          icon: "error",
          title: "Nama costumer tidak boleh kosong",
        },
      ]);
    } else if (tglMulai === "") {
      Toast([
        {
          icon: "error",
          title: "Tanggal belum di tentukan",
        },
      ]);
    } else if (periksa === false) {
      Toast([
        {
          icon: "error",
          title: "Anda belum memeriksa ketersediaan ruangan",
        },
      ]);
    } else {
      firebase
        .database()
        .ref("order")
        .push(
          {
            OrderId: e.target[0].value,
            Paket: paket,
            JumlahPaket: totalPaket,
            NamaPemesan: e.target[3].value,
            Ruangan: e.target[4].value,
            TanggalSewa: convertTglMulai,
            TanggalSelesai: tglSelesai,
            Status: statusPembayaran,
            TotalPembayaran: totalPayment,
            BuktiPembayaran: "",
            JatuhTempo: jatuhTempo.toString(),
          },
          (error) => {
            if (error) {
              // The write failed...
              alert("Gagal Simpan");
            } else {
              // Data saved successfully!
              // alert("Profile Berhasil Di Simpan");
              // toastSucces();
              Toast([
                {
                  icon: "success",
                  title: "Pemesanan Ruangan Berhasil",
                },
              ]);
              console.log(
                "send value: ",
                e.target[0].value,
                paket,
                totalPaket,
                e.target[3].value,
                e.target[4].value,
                convertTglMulai,
                tglSelesai,
                statusPembayaran,
                totalPayment,
                statusPembayaran,
                jatuhTempo
              );
              window.$("#modal-lg").modal("hide");
              window.location.reload();

              // window.$(this.modal).modal("hide");
              // window.$(this.modal).on("hidden.bs.modal");
              // e.target[10].dismiss = "modal";
            }
          }
        );
    }
  };

  const checkDateAvaliable = (e) => {
    // console.log(e.nativeEvent.path);
    // console.log(e.nativeEvent.path[5][4].value);
    // console.log(e.target.parentNode.firstChild.offsetParent);

    console.log(paket);
    console.log(totalPaket);
    console.log(room);
    console.log(tglMulai);

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
    } else if (tglMulai === "") {
      Toast([
        {
          icon: "error",
          title: "Tanggal sewa tidak boleh kosong",
        },
      ]);
    } else {
      //////////////////// Colect data from firebase ////////////////////
      return firebase
        .database()
        .ref("/order/")
        .orderByChild("Ruangan")
        .equalTo(room)
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

            console.log(dataHasil);
            console.log(dataHasil[0].data.TanggalSewa);
            console.log(dataHasil[0].data.TanggalSelesai);

            //////////////////// Formating Start Date ////////////////////
            console.log("tglMulai ", tglMulai);
            // let startDay = tglMulai;

            let StartDate =
              tglMulai.getDate() +
              "-" +
              parseInt(tglMulai.getMonth() + 1) +
              "-" +
              tglMulai.getFullYear();

            console.log("StartDate ", StartDate);
            setConvertTglMulai(StartDate);

            //////////////////// Formating Finish Date ////////////////////
            // var IncreseDate = new Date(
            //   "Fri Jul 1 2023 00:00:00 GMT+0700 (Western Indonesia Time)"
            // );

            var PickerDate = new Date(tglMulai);

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

              // IncreseDate = PickerDate.setMonth(
              //   PickerDate.getMonth() + jmlPaket
              // );

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
            setTglSelesai(FinishDay);

            //////////////////// Check Avaliable Start Date ////////////////////
            let i = 0;

            var statusAvaliable = true;

            do {
              if (
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
                  title: `Ruangan ${room} Pada tanggal ${dateStart} - ${dateEnd} tersedia`,
                },
              ]);
            } else {
              setPeriksa(false);
              Toast([
                {
                  icon: "error",
                  title: `Ruangan ${resultStart} Pada tanggal ${dateStart} - ${dateEnd} tidak bisa dipesan`,
                },
              ]);
            }
          } else {
            console.log("Data tidak ditemukan");

            //////////////////// Formating Start Date ////////////////////
            console.log("tglMulai ", tglMulai);
            // let startDay = tglMulai;

            let StartDate =
              tglMulai.getDate() +
              "-" +
              parseInt(tglMulai.getMonth() + 1) +
              "-" +
              tglMulai.getFullYear();

            console.log("StartDate ", StartDate);
            setConvertTglMulai(StartDate);

            //////////////////// Formating Finish Date ////////////////////
            // var IncreseDate = new Date(
            //   "Fri Jul 1 2023 00:00:00 GMT+0700 (Western Indonesia Time)"
            // );

            var IncreseDate2 = new Date(tglMulai);

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
            setTglSelesai(FinishDay);

            //////////////////// Toast ////////////////////
            setPeriksa(true);
            Toast([
              {
                icon: "success",
                title: `Ruangan ${room} tersedia`,
              },
            ]);
          }
        });
    }
  };

  const paymentDue = () => {
    var date = new Date();

    // add a day
    date.setDate(date.getDate() + 3);

    return new Promise((resolve) => {
      resolve(date);
    });
  };

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   console.log(e.target.parentElement[3].value);
  //   params.target.parentNode.children[0].innerText;
  //   console.log("Tanggal Sewa: ", e.target[3].value);
  //   console.log("Tanggal Selesai: ", e.target[4].value);
  // };

  // const handleTotalPayment = async () => {
  //   if (paket !== "") {
  //     setTotalPayment("1.000.000");
  //     // console.log("Totalnya adalah");
  //   } else {
  //     // console.log("inputan masih ada yang kosong");
  //   }

  //   console.log("handleTotalPayment");
  // };

  // const toastSucces = () => {
  //   var Toast = Swal.mixin({
  //     toast: true,
  //     position: "top-end",
  //     showConfirmButton: false,
  //     timer: 3000,
  //   });

  //   Toast.fire({
  //     icon: "success",
  //     title: "Pemesanan Ruangan Berhasil",
  //   });
  // };

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
                    <select
                      className="form-control"
                      onChange={(e) => setPaket(e.target.value)}
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
                        onChange={(e) => setTotalPaket(e.target.value)}
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
                    onChange={(e) => setNameCostumer(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Ruangan</label>
                  <select
                    className="form-control"
                    onChange={(e) => setRoom(e.target.value)}
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
                      value={tglMulai}
                      format={"dd-MM-y"}
                      onChange={(e) => {
                        setTglMulai(e);
                        setPeriksa(false);
                        console.log(e);
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
                      onClick={() => setStatusPembayaran("Active")}
                      defaultChecked
                    />
                    <label htmlFor="radioPrimary1">Active</label>
                  </div>
                  <div
                    className="icheck-sunflower d-inline"
                    style={{ marginRight: 10 }}
                  >
                    <input
                      type="radio"
                      id="radioPrimary2"
                      name="r1"
                      onClick={() => setStatusPembayaran("Menunggu Pembayaran")}
                    />
                    <label htmlFor="radioPrimary2">Menunggu Pembayaran</label>
                  </div>
                  <div
                    className="icheck-concrete d-inline"
                    style={{ marginRight: 10 }}
                  >
                    <input
                      type="radio"
                      id="radioPrimary3"
                      name="r1"
                      onClick={() => setStatusPembayaran("Selesai")}
                    />
                    <label htmlFor="radioPrimary3">Selesai</label>
                  </div>
                  <div className="icheck-danger d-inline">
                    <input
                      type="radio"
                      id="radioPrimary4"
                      name="r1"
                      onClick={() => setStatusPembayaran("Batal")}
                    />
                    <label htmlFor="radioPrimary4">Batal</label>
                  </div>
                </div>
              </div>
              {/* /.card-body */}

              <div style={{ marginRight: "10px", color: "green" }}>
                <h3 className="float-right">Total Rp {totalPayment}</h3>
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
