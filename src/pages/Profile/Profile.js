import React, { Component } from "react";
import firebase from "../../config/firebase";
import { storage } from "../../config/firebase";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import "./Profile.css";

class Profile extends Component {
  state = {
    userId: "zAhbiHR06ZQbwSdTiT6ftB91BH62",
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    setimage: null,
    url: "",
    setUrl: "",
    progress: "0",
    setProgress: "0",
    foto: "Pilih Foto",
    statusUpload: false,
  };

  // const [image, setimage] = useState(null);
  // const [url, setUrl] = useState("");
  // const [progress, setProgress] = useState(0);

  componentDidMount() {
    // document.title = "Profile";
    return firebase
      .database()
      .ref("/users/" + this.state.userId)
      .once("value")
      .then((snapshot) => {
        const getNama = snapshot.val() && snapshot.val().Nama;
        const getEmail = snapshot.val() && snapshot.val().Email;
        const getTelepon = snapshot.val() && snapshot.val().Telepon;
        const getAlamat = snapshot.val() && snapshot.val().Alamat;
        const getFoto = snapshot.val() && snapshot.val().Profile_Picture;
        // console.log(username);
        this.setState({
          nama: getNama,
          email: getEmail,
          telepon: getTelepon,
          alamat: getAlamat,
          setUrl: getFoto,
        });
        console.log(this.state.setUrl);
      });
  }

  componentWillUnmount() {}

  handleChangeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  fileSelectHandler = (event) => {
    // console.log(event.target.files[0].name);
    this.setState({
      setimage: event.target.files[0],
      foto: event.target.files[0].name,
    });
    // if (e.target.files[0]) {
    //   setimage(e.target.files[0]);
    // }
  };

  handleSaveProfile = () => {
    firebase
      .database()
      .ref("users/" + this.state.userId)
      .set(
        {
          Nama: this.state.nama,
          Email: this.state.email,
          Telepon: this.state.telepon,
          Alamat: this.state.alamat,
          Profile_Picture: this.state.foto,
        },
        (error) => {
          if (error) {
            // The write failed...
            alert("Gagal Simpan");
          } else {
            // Data saved successfully!
            alert("Profile Berhasil Di Simpan");
            console.log(
              this.state.nama,
              this.state.email,
              this.state.telepon,
              this.state.alamat,
              this.state.foto
            );
          }
        }
      );
  };

  handleUploadImage = () => {
    // console.log(this.state.setimage);
    const uploadTask = storage
      .ref(`profile/${this.state.setimage.name}`)
      .put(this.state.setimage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(progress);
        this.setState({
          statusUpload: true,
          setProgress: progress,
        });
        console.log(this.state.setProgress + " %");
        // document.title = "Upload " + this.state.setProgress + "%";
        // if (this.state.setProgress === "100") {
        //   alert("Update Foto Berhasil");
        // }
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("profile")
          .child(this.state.setimage.name)
          .getDownloadURL()
          .then((url) => {
            // console.log(url);
            // setUrl(url);
            this.setState({
              setUrl: url,
            });
            // alert("Update Foto Berhasil");
            firebase
              .database()
              .ref("users/" + this.state.userId)
              .set(
                {
                  Nama: this.state.nama,
                  Email: this.state.email,
                  Telepon: this.state.telepon,
                  Alamat: this.state.alamat,
                  Profile_Picture: this.state.setUrl,
                },
                (error) => {
                  if (error) {
                    // The write failed...
                    alert("Gagal Simpan Ke Database");
                  } else {
                    // Data saved successfully!
                    alert("Update Foto Berhasil");
                    console.log(this.state.setUrl);
                    this.setState({
                      statusUpload: false,
                      foto: "Pilih Foto",
                    });
                  }
                }
              );
          });
      }
    );
  };

  handleChangePassword = () => {
    sendPasswordResetEmail(getAuth(), this.state.email)
      .then(() => {
        console.log(this.state.email);
        alert("Email Reset Password Telah Dikirim");
      })
      .catch((err) => {
        console.log(err.code);
        // alert("Email Tidak Terdaftar");
      });
  };

  testhandle = () => {
    console.log(this.state.setimage);
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
            <h3 className="widget-user-username text-right">
              {this.state.nama}
            </h3>
            {/* <h5 className="widget-user-desc text-right">Web Designer</h5> */}
          </div>
          <div className="widget-user-image">
            <img
              className="img-circle"
              src={this.state.setUrl}
              alt="User Avatar"
              style={{ width: 150, height: 150 }}
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
          <div className="FormProfile">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nama</label>
                <input
                  type="text"
                  className="form-control"
                  id="nama"
                  placeholder="Nama"
                  value={this.state.nama}
                  onChange={this.handleChangeInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChangeInput}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Telepon</label>
                <input
                  type="text"
                  className="form-control"
                  id="telepon"
                  placeholder="Nomor Telepon"
                  value={this.state.telepon}
                  onChange={this.handleChangeInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Alamat</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Alamat"
                  value={this.state.alamat}
                  id="alamat"
                  onChange={this.handleChangeInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputFile">Upload Foto</label>
                <div className="input-group">
                  {/* Mode Upload */}
                  {this.state.statusUpload ? (
                    <div className="progress-bar">
                      <span
                        className="progress-bar-inner"
                        style={{
                          width: `${this.state.setProgress}%`,
                        }}
                      />
                    </div>
                  ) : (
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="foto"
                        onChange={this.fileSelectHandler}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="exampleInputFile"
                      >
                        {this.state.foto}
                      </label>
                    </div>
                  )}

                  <div className="input-group-append">
                    <span
                      className="input-group-text bg-danger"
                      onClick={this.handleUploadImage}
                    >
                      {this.state.statusUpload
                        ? this.state.setProgress + "%"
                        : "Upload"}
                    </span>
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

              <button
                className="btn btn-primary change-password"
                onClick={this.handleChangePassword}
              >
                Ganti Password
              </button>
            </div>
          </div>
          {/* <div className="card-header">
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
          </form> */}
        </div>
        {/* /.card */}
      </div>
    );
  }
}

export default Profile;
