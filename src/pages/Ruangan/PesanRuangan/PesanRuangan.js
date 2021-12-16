import React, { Component } from "react";

class PesanRuangan extends Component {
  state = {
    tanggalSekarang: "",
  };

  componentDidMount() {
    window.$("#TanggalSewa").datetimepicker({
      format: "DD-MM-YYYY",
    });
    window.$("#TanggalSelesai").datetimepicker({
      format: "DD-MM-YYYY",
    });

    let hariini = new Date();
    let tgl =
      hariini.getDate() +
      "-" +
      parseInt(hariini.getMonth() + 1) +
      "-" +
      hariini.getFullYear();

    this.setState({
      tanggalSekarang: tgl,
    });

    console.log(new Date());
  }

  // formatDate = (e) => {
  //   let tanggalMulai = new Date(e.target[3].value);
  //   let TanggalSew = `${tanggalMulai.getDate()}-${
  //     tanggalMulai.getMonth() + 1
  //   }-${tanggalMulai.getFullYear()}`;

  //   this.setState({
  //     tanggalSewa: TanggalSew,
  //   });

  //   console.log(this.state.tanggalSewa);
  // };

  handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target[3].value);

    // this.formatDate(e);

    console.log("Order Id: ", e.target[0].value);
    console.log("Nama Pemesan: ", e.target[1].value);
    console.log("Ruangan: ", e.target[2].value);
    console.log("Tanggal Sewa: ", e.target[3].value);
    console.log("Tanggal Selesai: ", e.target[4].value);

    if (e.target[5].checked === true) {
      console.log("Active");
    } else if (e.target[6].checked === true) {
      console.log("Menunggu Pembayaran");
    } else if (e.target[7].checked === true) {
      console.log("Selesai");
    } else if (e.target[8].checked === true) {
      console.log("Batal");
    } else {
      console.log("error");
    }

    // console.log(e.target[5].checked);
    // console.log(e.target[6].checked);
    // console.log(e.target[7].checked);
    // console.log(e.target[8].checked);
  };

  render() {
    return (
      <div className="container">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Pesan Ruangan</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form onSubmit={this.handleSubmit}>
            <div className="card-body">
              <div className="form-group">
                <label>Order ID</label>
                <input type="text" className="form-control" id="orderID" />
              </div>
              <div className="form-group">
                <label>Nama Pemesan</label>
                <input
                  type="text"
                  className="form-control"
                  id="NamaPemesan"
                  placeholder="Nama Panjang"
                />
              </div>
              <div className="form-group">
                <label>Ruangan</label>
                <select className="form-control">
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
                  <input
                    type="text"
                    className="form-control datetimepicker-input"
                    data-target="#TanggalSewa"
                    // onChange={(e) => setDate(e.target.value)}
                    // onClick={(e) => console.log(e.target.value)}

                    // value={new Intl.DateTimeFormat("en-GB", {
                    //   year: "numeric",
                    //   month: "2-digit",
                    //   day: "2-digit",
                    // }).format(this.state.tanggalSewa)}

                    value={this.state.tanggalSekarang}
                    onChange={(e) => {
                      // this.setState({ tanggalSewa: e.target[3].value });
                      console.log(e.target.value);
                    }}
                  />
                  <div
                    className="input-group-append"
                    data-target="#TanggalSewa"
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
                  id="TanggalSelesai"
                  data-target-input="nearest"
                >
                  <input
                    type="text"
                    className="form-control datetimepicker-input"
                    data-target="#TanggalSelesai"
                    value={this.state.tanggalSekarang}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <div
                    className="input-group-append"
                    data-target="#TanggalSelesai"
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
                    id="radioPrimary1"
                    name="r1"
                    defaultChecked
                  />
                  <label htmlFor="radioPrimary1">Active</label>
                </div>
                <div
                  className="icheck-sunflower d-inline"
                  style={{ marginRight: 10 }}
                >
                  <input type="radio" id="radioPrimary2" name="r1" />
                  <label htmlFor="radioPrimary2">Menunggu Pembayaran</label>
                </div>
                <div
                  className="icheck-concrete d-inline"
                  style={{ marginRight: 10 }}
                >
                  <input type="radio" id="radioPrimary3" name="r1" />
                  <label htmlFor="radioPrimary3">Selesai</label>
                </div>
                <div className="icheck-danger d-inline">
                  <input type="radio" id="radioPrimary4" name="r1" />
                  <label htmlFor="radioPrimary4">Batal</label>
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PesanRuangan;