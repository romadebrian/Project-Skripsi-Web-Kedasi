// rce
import React, { Fragment, useCallback, useEffect, useState } from "react";
import CreateNotification from "./CreateNotification/CreateNotification";
import ItemNotification from "./props/ItemNotification";
import firebase from "../../config/firebase";
import DetailNotification from "./props/DetailNotification";

function Notifikasi() {
  const [dataNotifikasi, setDataNotifikasi] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const handleGetData = useCallback(() => {
    return firebase
      .database()
      .ref("/notifikasi/")
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

        setDataNotifikasi(data);
      });
  }, []);

  useEffect(() => {
    if (!isLoad) {
      handleGetData();
      setIsLoad(true);
    }
    // console.log(dataNotifikasi);
  }, [handleGetData, isLoad, dataNotifikasi]);

  const setTitleForDetail = (data) => {
    console.log("params", data);
    setDataDetail({ data });
  };

  console.log(dataNotifikasi);

  return (
    <div>
      <div className="card-header ">
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#form-notifikasi"
        >
          Buat Pemperitahuan
        </button>
      </div>

      {dataNotifikasi.length > 0 ? (
        <Fragment>
          {dataNotifikasi.map((result) => {
            // console.log(result);
            return (
              <ItemNotification
                key={result.id}
                primaryKey={result.id}
                tanggal={result.data.Date}
                judul={result.data.Judul}
                metaData={result.data.Meta_Data}
                isi={result.data.Isi}
                pelanggan={result.data.Target}
                aksi={result.data.Aksi}
                status={result.data.Status}
                sendData={(e) => setTitleForDetail(e)}
              />
            );
          })}
        </Fragment>
      ) : null}

      <CreateNotification />
      <DetailNotification dataDetail={dataDetail} />
    </div>
  );
}

// let chat = (
//   <div>
//     <Notifikasi sender="dian" tanggal={tanggal} content="Hi, Apa kabar?" />
//     <Notifikasi sender="petanikode" tanggal={tanggal} content="Kabar Baik" />
//   </div>
// );

export default Notifikasi;
