import React from "react";

function DetailOrder() {
  return (
    <div className="modal fade" id="modal-lg">
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
                      value={tanggalSekarang}
                      onChange={(e) => {
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
                      value={tanggalSekarang}
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

export default DetailOrder;
