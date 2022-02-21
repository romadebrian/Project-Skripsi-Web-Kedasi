// import React from "react";
import Swal from "sweetalert2";

function Toast(props) {
  //   console.log("propsnya", props[0].title);
  var Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
  });

  Toast.fire({
    icon: props[0].icon,
    title: props[0].title,
  });
}

export default Toast;
