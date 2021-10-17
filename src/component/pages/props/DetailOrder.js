import React from "react";

function DetailOrder() {
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
                    <strong>Roma Debrian</strong>
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
                  <b>Invoice #007612</b>
                  <br />
                  <br />
                  <b>Order ID:</b> 4F3S8J
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
                        <td>1</td>
                        <td>Ruangan-003 3x3 Lt.1</td>
                        <td>7 Days</td>
                        <td>Rp.700.000</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Rungan-002 3x4 L2</td>
                        <td>3 Days</td>
                        <td>Rp.300.000</td>
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
                          <td>Rp.1.000.000</td>
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

export default DetailOrder;
