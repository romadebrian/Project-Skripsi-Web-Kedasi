import React, { Component, Fragment } from "react"; //rce
import PesanRuangan from "./PesanRuangan/PesanRuangan";
// import ItemRuangan from "./props/Ruangan/ItemRuangan";
import firebase from "../../config/firebase";
import DetailOrder from "./DetailOrder/DetailOrder";

import "./Ruangan.css";

class Ruangan extends Component {
  state = {
    tanggalJarak: "01/01/2018 - 01/15/2018",
    orderList: "",
    orderDetail: "",
  };

  componentDidMount() {
    this.handleGetData();
  }

  componentDidUpdate() {}

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

        // console.log("val Order: ", this.state.orderList);

        // dispatch({ type: "SET_NOTES", value: data });
        // resolve(snapshot.val());
      });
  };

  handleEdit = (params) => {
    // console.log(params.target.parentNode.children[0].innerText);
    // this.setState({ orderId: params.target.parentNode.children[0].innerText });

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

        // console.log(dataHasil[0].data.OrderId);
        this.setState({ orderDetail: dataHasil[0].data });

        // var datadetails = dataHasil[0];
        // console.log(datadetails);
      });
  };

  handleTanggalJarak = (params) => {};

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
                        <td>
                          <span className={badge}>{pesanan.data.Status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              ) : null}
            </tbody>

            {/* <ItemRuangan Status="Active" CSSClass="badge badge-success" />
            <ItemRuangan Status="Pending" CSSClass="badge badge-warning" />
            <ItemRuangan Status="Ended" CSSClass="badge badge-secondary" />
            <ItemRuangan Status="Cancelled" CSSClass="badge badge-danger" /> */}
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
          >
            Buat Pesanan Baru
          </button>
          <button
            // href="/printlaporan"
            className="btn btn-sm btn-secondary float-right"
            onClick={this.handletes}
          >
            Print Laporan
          </button>
          <input
            type="text"
            className="float-right"
            name="daterange"
            value={this.state.tanggalJarak}
            onChange={this.handleTanggalJarak}
            style={{ marginRight: "20px" }}
          />
        </div>
        {/* /.card-footer */}

        <PesanRuangan />
        <DetailOrder dataDetail={this.state.orderDetail} ref={this.child} />

        {/* {this.state.order.length > 0 ? (
          <Fragment>
            {this.state.order.map((pesanan) => {
              // console.log("Data Pesanan ", pesanan.data.OrderId);
              return (
                <tbody key={pesanan.id}>
                  <tr>
                    <td>
                      <a href="/detailorder">{pesanan.data.OrderId} </a>
                    </td>
                    <td>{pesanan.data.NamaPemesan} </td>
                    <td>{pesanan.data.Ruangan} </td>
                    <td>{pesanan.data.TanggalSewa} </td>
                    <td>{pesanan.data.TanggalSelesai} </td>
                    <td>
                      <span className="badge badge-success">
                        {pesanan.data.Status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Fragment>
        ) : (
          <p>Data Tidak ada</p>
        )} */}
      </div>
    );
  }
}

export default Ruangan;
