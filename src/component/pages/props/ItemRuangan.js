import React from "react"; //frce

var Order_ID = "OR0001";
var Nama_Pelanggan = "Roma Debrian";

class ItemRuangan extends React.Component {
  render() {
    return (
      <tbody>
        <tr>
          <td>
            <a href="pages/examples/invoice.html">{Order_ID}</a>
          </td>
          <td>{Nama_Pelanggan}</td>
          <td>ROOM-001</td>
          <td>15-10-2021</td>
          <td>20-10-2021</td>
          <td>
            <span className={this.props.CSSClass}>{this.props.Status}</span>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default ItemRuangan;
