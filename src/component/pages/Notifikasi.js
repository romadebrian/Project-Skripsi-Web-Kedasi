// rce
import React, { Component } from "react";
import ItemNotification from "./props/ItemNotification";

// menggunakan komponen
var tanggal = " 08 Sep 2021";

class Notifikasi extends Component {
  render() {
    return (
      <div>
        <ItemNotification
          pelanggan="Roma D"
          tanggal={tanggal}
          ruangan="ROOM-003"
          OrderID="PRM-001"
        />
        <ItemNotification
          pelanggan="Debrian"
          tanggal={tanggal}
          ruangan="ROOM-001"
          OrderID="PRM-002"
        />
      </div>
    );
  }
}

// let chat = (
//   <div>
//     <Notifikasi sender="dian" tanggal={tanggal} content="Hi, Apa kabar?" />
//     <Notifikasi sender="petanikode" tanggal={tanggal} content="Kabar Baik" />
//   </div>
// );

export default Notifikasi;
