import React, { Component } from "react";

import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { withRouter } from "react-router-dom";

class LupaPassword extends Component {
  state = {
    email: "",
  };

  handleChangeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSendEmail = () => {
    sendPasswordResetEmail(getAuth(), this.state.email)
      .then(() => {
        console.log(this.state.email);
        alert("Email Reset Password Telah Dikirim");
        this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err.code);
        alert("Email Tidak Terdaftar");
      });
  };

  render() {
    return (
      <div className="badan text-center">
        <div className="form-signin">
          <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={this.handleChangeInput}
              style={{ marginBottom: 20 }}
            />
          </div>
          <button
            className="w-100 btn btn-lg btn-primary btn-login"
            onClick={this.handleSendEmail}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(LupaPassword);
