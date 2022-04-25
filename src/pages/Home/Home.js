import { Component } from "react";
import firebase from "../../config/firebase";

class Home extends Component {
  state = {
    listOrder: [],
    totalStatus: [
      { totalActive: 0, totalPending: 0, totalDone: 0, totalCancel: 0 },
    ],
  };

  componentDidMount() {
    this.handleGetData();
  }

  componentWillUnmount() {
    this.handleGetData();
  }

  handleGetData = () => {
    return firebase
      .database()
      .ref("/order/")
      .on("value", (snapshot) => {
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

        this.setState({ listOrder: data }, () => {
          console.log("List Order: ", data);
          this.handleTotalOrderStatus();
        });
      });
  };

  handleTotalOrderStatus = () => {
    // console.log(this.state.listOrder[1].data.Status);
    let totalOrder = this.state.listOrder.length;

    // console.log(totalOrder);

    let Active = 0;
    let Pennding = 0;
    let Done = 0;
    let Cancel = 0;

    const checkStatus = async (i) => {
      if (this.state.listOrder[i].data.Status === "Active") {
        Active = Active + 1;
        // this.setState(
        //   {
        //     totalStatus: [
        //       { ...this.state.totalStatus[0], totalActive: Active },
        //     ],
        //   },
        //   () => {
        //     console.log(this.state);
        //   }
        // );
      } else if (
        this.state.listOrder[i].data.Status === "Menunggu Pembayaran"
      ) {
        Pennding = Pennding + 1;
      } else if (this.state.listOrder[i].data.Status === "Selesai") {
        Done = Done + 1;
      } else if (this.state.listOrder[i].data.Status === "Batal") {
        Cancel = Cancel + 1;
      }
    };

    let i = 0;
    do {
      checkStatus(i);
      i++;
    } while (i < totalOrder);

    this.setState(
      {
        totalStatus: [
          {
            totalActive: Active,
            totalPending: Pennding,
            totalDone: Done,
            totalCancel: Cancel,
          },
        ],
      },
      () => {
        console.log(this.state.totalStatus[0]);
      }
    );
  };

  render() {
    return (
      <div>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard v1</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3> {this.state.totalStatus[0].totalActive} </h3>
                    <p>Orders Active</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="/" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3> {this.state.totalStatus[0].totalPending} </h3>
                    <p>Unpaid Order</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="/" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-secondary">
                  <div className="inner">
                    <h3> {this.state.totalStatus[0].totalDone} </h3>
                    <p>Order Done</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="/" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3> {this.state.totalStatus[0].totalCancel} </h3>
                    <p>Order Cancel</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="/" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
