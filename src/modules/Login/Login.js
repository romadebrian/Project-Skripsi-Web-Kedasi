import React from "react"; //rfce
import "./Login.css";

function Login() {
  return (
    <div className="badan text-center">
      <div className="form-signin">
        <form>
          <img
            className="mb-4"
            src="/dist/img/kedasi logo.jpg"
            alt="Logo"
            width={72}
            height={57}
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" />
              <span> Remember me </span>
            </label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary btn-login"
            type="submit"
          >
            Sign in
          </button>
          <hr />
          <div className="text-center">
            <a className="small" href="/">
              Forgot Password?
            </a>
          </div>
          <div className="text-center">
            <a className="small" href="{{ url('/register')}}">
              Create an Account!
            </a>
          </div>
          <p className="mt-5 mb-3 text-muted Copyright">© 2020–2025</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
