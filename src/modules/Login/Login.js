import React from "react"; //rfce
// import "./Login.css";

function Login() {
  return (
    <div className="text-center">
      <main className="form-signin">
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
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" />
              Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <hr />
          <div className="text-center">
            <a className="small" href>
              Forgot Password?
            </a>
          </div>
          <div className="text-center">
            <a className="small" href="{{ url('/register')}}">
              Create an Account!
            </a>
          </div>
          <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    </div>
  );
}

export default Login;
