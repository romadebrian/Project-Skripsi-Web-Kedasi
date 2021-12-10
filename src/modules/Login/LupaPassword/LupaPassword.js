import React, { Component } from "react";

class LupaPassword extends Component {
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
            />
          </div>
          <button
            className="w-100 btn btn-lg btn-primary btn-login"
            onClick={this.handleLogin}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default LupaPassword;
