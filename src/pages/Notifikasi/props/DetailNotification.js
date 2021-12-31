import React from "react";

function DetailNotification() {
  return (
    <div className="modal fade" id="detail-notifikasi">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Detail Notifikasi</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}

            <div className="card-body">
              <div className="form-group">
                <label>Judul</label>
                <input
                  type="text"
                  className="form-control"
                  id="Frm_Judul"
                  placeholder="judul notifikasi"
                />
              </div>
              <div className="form-group">
                <label>Isi</label>
                <textarea
                  type="text"
                  className="form-control"
                  rows="3"
                  id="Frm_Isi"
                  placeholder="isi notifikasi"
                />
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-target="#ModalClose"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailNotification;
