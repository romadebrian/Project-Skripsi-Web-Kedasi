import React, { Component } from "react"; //rce
import PesanRuangan from "./PesanRuangan/PesanRuangan";
import ItemRuangan from "./props/Ruangan/ItemRuangan";

class Ruangan extends Component {
  state = {
    showFrom: false,
  };

  componentDidMount() {}

  metodeFromMode = (params) => {
    this.setState({
      showFrom: params,
    });
    console.log(params);
  };

  ButtonShowForm = () => {
    this.setState({
      showFrom: true,
    });
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
            <ItemRuangan Status="Active" CSSClass="badge badge-success" />
            <ItemRuangan Status="Pending" CSSClass="badge badge-warning" />
            <ItemRuangan Status="Ended" CSSClass="badge badge-secondary" />
            <ItemRuangan Status="Cancelled" CSSClass="badge badge-danger" />
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
          <a
            href="/printlaporan"
            className="btn btn-sm btn-secondary float-right "
          >
            Print Laporan
          </a>
          <input
            type="text"
            className="float-right"
            name="daterange"
            value="01/01/2018 - 01/15/2018"
            style={{ marginRight: "20px" }}
          />
        </div>
        {/* /.card-footer */}
        <PesanRuangan
          trigger={(value) => this.metodeFromMode(value)}
          modeFrom={this.state.showFrom}
        />
      </div>
    );
  }
}

export default Ruangan;
