import React, { Component, Fragment } from "react"; //rce
import { Link } from "react-router-dom";
import PesanRuangan from "./PesanRuangan/PesanRuangan";
// import ItemRuangan from "./props/Ruangan/ItemRuangan";
import firebase from "../../config/firebase";
import DetailOrder from "./DetailOrder/DetailOrder";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import "./Ruangan.css";

class Ruangan extends Component {
  state = {
    tanggalJarak: "01/01/2018 - 01/15/2018",
    orderList: "",
    orderDetail: "",
    modeEdit: false,
    nextOrderId: "",
    valDateRange: [new Date(), new Date()],
  };

  componentDidMount() {
    this.handleGetData();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  handleGetData = () => {
    return firebase
      .database()
      .ref("/order/")
      .on("value", (snapshot) => {
        // const data = snapshot.val();
        // updateStarCount(postElement, data);

        // console.log("get data firebase : ", snapshot.val());

        const data = [];
        if (snapshot.exists()) {
          Object.keys(snapshot.val()).map((key) => {
            data.push({
              id: key,
              data: snapshot.val()[key],
            });
            return data;
          });
        } else {
          console.log("Data tidak ditemukan");
        }

        this.setState({ orderList: data });

        // console.log(this.state.orderList.length);

        console.log("List Order: ", data);

        // dispatch({ type: "SET_NOTES", value: data });
        // resolve(snapshot.val());
      });
  };

  handleInputOrder = () => {
    var totalOrderId = this.state.orderList.length;
    var init = totalOrderId + 1;
    var str = "" + init;
    var pad = "0000";
    var ans = pad.substring(0, pad.length - str.length) + str;
    const valVNextOrderId = "ORD" + ans;

    this.setState({ nextOrderId: valVNextOrderId });

    console.log(valVNextOrderId);
  };

  handleEdit = (params) => {
    // console.log(params.target.parentNode.children[0].innerText);
    // this.setState({ orderId: params.target.parentNode.children[0].innerText });

    this.setState({ modeEdit: true });

    const idPesanan = params.target.parentNode.children[0].innerText;

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
        this.setState({ orderDetail: dataHasil[0].data });
        // this.setState({ orderDetail: dataHasil });

        // var datadetails = dataHasil[0];
        // console.log(datadetails);
      });
  };

  handleTanggalJarak = (params) => {
    let tglMulai = params[0];
    let tglSampai = params[1];

    console.log("awal", tglMulai);
    console.log("sampai", tglSampai);

    this.setState({ valDateRange: params });

    // delete this.state.orderList[1];
  };

  trunOffModeEdit = () => {
    this.setState({ modeEdit: false });
  };

  render() {
    return (
      <div className="card">
        <div className="card-header border-transparent">
          <h3 className="card-title">Latest Orders</h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus" />
            </button>
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        {/* /.card-header */}
        {/* Table Responsive */}
        <div className="card-body p-0">
          <div className="table-responsive"></div>
          <table className="table m-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Nama</th>
                <th>Ruangan</th>
                <th>Tanggal Sewa</th>
                <th>Tanggal Selesai</th>
                <th>Status</th>
                {/* Pennding, Active, Contract has ended, dan cancelled */}
              </tr>
            </thead>

            <tbody>
              {this.state.orderList.length > 0 ? (
                <Fragment>
                  {this.state.orderList.map((pesanan) => {
                    // console.log("Data Pesanan ", pesanan.data.OrderId);
                    var badge;
                    if (pesanan.data.Status === "Active") {
                      badge = "badge badge-success";
                    } else if (pesanan.data.Status === "Menunggu Pembayaran") {
                      badge = "badge badge-warning";
                    } else if (pesanan.data.Status === "Selesai") {
                      badge = "badge badge-secondary";
                    } else {
                      badge = "badge badge-danger";
                    }
                    return (
                      <tr
                        className="row-pesanan"
                        key={pesanan.id}
                        data-toggle="modal"
                        data-target="#form-edit"
                        onClick={(pesanan) => this.handleEdit(pesanan)}
                      >
                        <td>{pesanan.data.OrderId}</td>
                        <td>{pesanan.data.NamaPemesan} </td>
                        <td>{pesanan.data.Ruangan} </td>
                        <td>{pesanan.data.TanggalSewa} </td>
                        <td>{pesanan.data.TanggalSelesai} </td>
                        <td className={badge}>{pesanan.data.Status}</td>
                      </tr>
                    );
                  })}
                </Fragment>
              ) : null}
            </tbody>
          </table>
          {/* /.table-responsive */}
        </div>
        {/* /.card-body */}
        <div className="card-footer clearfix">
          <button
            className="btn btn-sm btn-info float-left"
            // onClick={this.toestSucces}
            data-toggle="modal"
            data-target="#modal-lg"
            onClick={this.handleInputOrder}
          >
            Buat Pesanan Baru
          </button>

          {/* <Link to="/print">
            <button
              className="btn btn-sm btn-secondary float-right"
              onClick={this.handletes}
            >
              Print Laporan
            </button>
          </Link> */}

          <DateRangePicker
            className="float-right text-center"
            style={{ marginRight: "20px" }}
            onChange={(e) => this.handleTanggalJarak(e)}
            value={this.state.valDateRange}
          />

          {/* <input
            type="text"
            className="float-right"
            name="daterange"
            value={this.state.tanggalJarak}
            onChange={this.handleTanggalJarak}
            style={{ marginRight: "20px" }}
          /> */}
        </div>
        {/* /.card-footer */}

        <PesanRuangan newOrderId={this.state.nextOrderId} />
        <DetailOrder
          dataDetail={this.state.orderDetail}
          ref={this.child}
          editStatus={this.state.modeEdit}
          // totalOrderId={this.state.orderList.length}
          disableModeEdit={() => this.trunOffModeEdit()}
        />
      </div>
    );
  }
}

export default Ruangan;
