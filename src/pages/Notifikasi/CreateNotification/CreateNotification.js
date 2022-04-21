import React from "react"; //rfce
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import firebase from "../../../config/firebase";

function CreateNotification(props) {
  const [isloaded, setLoaded] = useState(false);
  const [aksi, setAksi] = useState("");

  useEffect(() => {
    window.$("#TanggalSewa").datetimepicker({
      format: "DD-MM-YYYY",
    });
    window.$("#TanggalSelesai").datetimepicker({
      format: "DD-MM-YYYY",
    });

    if (isloaded === false) {
      setLoaded(true);
    }
  }, [isloaded]);

  const handleSubmit = (e) => {
    var aksinya;
    var tanggal = new Date().toUTCString();
    e.preventDefault();

    console.log("Judul: ", e.target[0].value);
    console.log("isi: ", e.target[1].value);
    console.log("Target: ", e.target[2].value);

    if (e.target[3].value === "Default") {
      aksinya = "Default";
      console.log("Default");
    } else if (e.target[3].value === "Buka Aplikasi") {
      aksinya = e.target[4].value;
      console.log("Buka Aplikasi", e.target[4].value);
    } else if (e.target[3].value === "Buka Url") {
      aksinya = e.target[4].value;
      console.log("Buka Url", e.target[4].value);
    } else {
      console.log("error");
    }

    firebase
      .database()
      .ref("notifikasi")
      .push(
        {
          Judul: e.target[0].value,
          Isi: e.target[1].value,
          Target: e.target[2].value,
          Aksi: aksinya,
          waktu: tanggal,
          Status: "Unread",
        },
        (error) => {
          if (error) {
            // The write failed...
            alert("Gagal Simpan");
          } else {
            // Data saved successfully!
            // alert("Profile Berhasil Di Simpan");
            toastSucces();
            console.log(
              "send value: ",
              e.target[0].value,
              e.target[1].value,
              e.target[2].value,
              aksinya,
              "Unread"
            );

            window.$("#form-notifikasi").modal("hide");
          }
        }
      );
  };

  const toastSucces = () => {
    var Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    Toast.fire({
      icon: "success",
      title: "Pemberitahuan Berhasil Di Kirim",
    });
  };

  const handleAksi = (params) => {
    setAksi(params.target.value);
  };

  return (
    <div className="modal fade" id="form-notifikasi">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Notifikasi Baru</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={handleSubmit}>
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

                <div className="form-group">
                  <label>Target</label>
                  <select className="form-control" id="Frm_Target_User">
                    <option>All</option>
                    <option>User 1</option>
                    <option>User 2</option>
                    <option>User 3</option>
                    <option>User 5</option>
                    <option>User 6</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Action</label>
                  <select
                    className="form-control"
                    id="Frm_Aksi"
                    onChange={(e) => handleAksi(e)}
                  >
                    <option>Default</option>
                    <option>Buka Aplikasi</option>
                    <option>Buka Url</option>
                  </select>
                </div>

                {aksi === "Buka Aplikasi" ? (
                  <div className="form-group">
                    <label>Target Aplikasi</label>
                    <select className="form-control" id="Frm_Target_Aplikasi">
                      <option>Halaman Utama</option>
                      <option>Pesan Ruangan</option>
                      <option>Chat</option>
                      <option>Notifikasi Area</option>
                    </select>
                  </div>
                ) : aksi === "Buka Url" ? (
                  <div className="form-group">
                    <label>Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="FrmLlink-Url"
                      placeholder="http://"
                    />
                  </div>
                ) : null}
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

export default CreateNotification;
