import React, { Component } from "react"; //rfce
import "./Login.css";
// import appFirebase from "../../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("EmailUser", JSON.stringify(this.state.email));
        this.props.history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code: ", errorCode);
        console.log("error messege: ", errorMessage);
        alert("Email atau Password salah");
      });
  };

  render() {
    return (
      <div className="badan text-center">
        <div className="form-signin">
          <img
            className="mb-4"
            src="/dist/img/kedasi logo.jpg"
            alt="Logo"
            width={72}
            height={57}
          />
          <h1 className="h3 mb-3 fw-normal">KEDASI</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={this.handleChangeInput}
            />
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={this.handleChangeInput}
            />
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" />
              <span> ingat saya </span>
            </label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary btn-login"
            onClick={this.handleLogin}
          >
            Masuk
          </button>
          <hr />
          <div className="text-center">
            <Link to="/lupa_password" className="small">
              Lupa Password
            </Link>
          </div>
          <p className="mt-5 mb-3 text-muted Copyright">© 2020–2025</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
