function DetailNotification(props) {
  const HandleJudul = () => {
    console.log("handle", props.dataDetail[0].judul);
  };

  return (
    <div
      className="modal fade"
      id="detail-notifikasi"
      onMouseEnter={() => HandleJudul()}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">{props.dataDetail[0].judul}</h3>
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
                  defaultValue={props.dataDetail[0].judul}
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
                  defaultValue={props.dataDetail[0].isi}
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
