import React from "react";

function Login() {
  return (
    <div className="App">
      <img
        src="https://cm.traditionasia.com/assets/img/tradition_asia_logo.svg"
        width="50%"
        alt=""
      />
      <br /><br />
      <div className="card">
      <h1>Login</h1>
        <div className="login-input">
          <label htmlFor="Email">Email</label>
          <input type="email" id="Email" />
        </div>
        <div className="login-input">
          <label htmlFor="Password">Password</label>
          <input type="password" id="Password" />
        </div>
        <div className="div-button">
          <button className="submit-button">Login</button>
        </div>
      </div>
      <br />
      <span>vertion 0.0.1</span>
    </div>
  );
}

export default Login;
