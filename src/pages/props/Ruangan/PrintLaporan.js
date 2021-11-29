import React from "react";

function PrintLaporan() {
  // $(function() {
  //     $('input[name="daterange"]').daterangepicker({
  //       opens: 'left'
  //     }, function(start, end, label) {
  //       console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  //     });
  //   });
  return (
    <div className="col-md-3">
      <div className="card card-primary shadow-lg">
        <div className="card-header">
          <h3 className="card-title">Print Laporan</h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times" />
            </button>
          </div>
          {/* /.card-tools */}
        </div>
        {/* /.card-header */}
        <div className="card-body">
          <div className="row">
            <input
              type="text"
              name="daterange"
              value="01/01/2018 - 01/15/2018"
            />
            <button
              type="submit"
              className="btn btn-info"
              style={{ marginLeft: "10px" }}
            >
              Print
            </button>
          </div>
        </div>
        {/* /.card-body */}
      </div>
      {/* /.card */}
    </div>
  );
}

export default PrintLaporan;
