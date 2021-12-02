import React, { Component } from "react";
import { getDatabase, ref, set } from "firebase/database";

class Profile extends Component {
  state = {
    userId: "zAhbiHR06ZQbwSdTiT6ftB91BH62",
    nama: "Roma Debrian",
    email: "roma_coll04@yahoo.com",
    telepon: "083877434091",
    alamat: "Bekasi",
    foto: "romadebrian.jpg",
  };

  handleSaveProfile = () => {
    const db = getDatabase();
    set(ref(db, "users/" + this.state.userId), {
      Nama: this.state.nama,
      Email: this.state.email,
      Telepon: this.state.telepon,
      Alamat: this.state.alamat,
      Profile_Picture: this.state.foto,
    });
  };

  render() {
    return (
      <div>
        {/* Widget: user widget style 1 */}
        <div className="card card-widget widget-user shadow-lg">
          {/* Add the bg color to the header using any of the bg-* classes */}
          <div
            className="widget-user-header text-white"
            style={{
              background: 'url("dist/img/bg.jpeg") center center',
              height: 180,
            }}
          >
            <h3 className="widget-user-username text-right">Roma Debrian</h3>
            <h5 className="widget-user-desc text-right">Web Designer</h5>
          </div>
          <div className="widget-user-image">
            <img
              className="img-circle"
              src="dist/img/romadebrian.png"
              alt="User Avatar"
              style={{ width: 150 }}
            />
          </div>
          <div className="card-footer">
            <div className="row" style={{ height: 20 }}></div>
            {/* /.row */}
          </div>
        </div>
        {/* /.widget-user */}
        {/* general form elements */}
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Profile</h3>
          </div>
          {/* /.card-header */}
          {/* form start */}
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputNama"
                  placeholder="Nama"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="InputEmail1"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Telepon</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputTelepon"
                  placeholder="Nomor Telepon"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Alamat</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Alamat"
                  defaultValue={""}
                  id="InputAlamat"
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputFile">Upload Foto</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="exampleInputFile"
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="exampleInputFile"
                    >
                      Choose file
                    </label>
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text">Upload</span>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <button
                className="btn btn-primary"
                onClick={this.handleSaveProfile}
              >
                Simpan
              </button>
            </div>
          </form>
          <div className="card-header">
            <h3 className="card-title">Ganti Password</h3>
          </div>
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password Baru</label>
                <input
                  type="password"
                  className="form-control"
                  id="InputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">
                  Ketik Ulang Password
                </label>
                <input
                  type="retypepassword"
                  className="form-control"
                  id="InputPassword2"
                  placeholder="RetypePassword"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Ganti Password
              </button>
            </div>
          </form>
        </div>
        {/* /.card */}
      </div>
    );
  }
}

export default Profile;
