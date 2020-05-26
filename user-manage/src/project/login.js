import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction } from "./../store/action/authAction";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrEmail, setErrEmail] = useState("");
  const [ErrPassword, setErrPassword] = useState("");

  return (
    <div className="App">
      <img
        src="https://cm.traditionasia.com/assets/img/tradition_asia_logo.svg"
        width="50%"
        alt=""
      />
      <br />
      <br />
      <div className="card">
        <h1>Login</h1>
        <div className="login-input">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (
                e.target.value.match(
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                )
              ) {
                setErrEmail("success");
              } else {
                setErrEmail("Email incorrect");
              }
            }}
          />
          <span className="text-err">{ErrEmail === "success" ? null : ErrEmail}</span>
        </div>
        <div className="login-input">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrPassword("success")
            }}
          />
          <span className="text-err">{ErrPassword === "success" ? null : ErrPassword}</span>
        </div>
        <div className="div-button">
          <button
            className="submit-button"
            onClick={() => {
              console.log(ErrEmail, ErrPassword);
              
              if (email === "") {
                setErrEmail("Please fill in your email");
              } else if (
                email.match(
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                )
              ) {
                setErrPassword("success");
              } else {
                setErrPassword("Email incorrect");
              }

              if (password === "") {
                setErrPassword("Please fill in your password");
              }

              if (ErrEmail === "success" && ErrPassword === "success") {
                const login = { email: email, password: password };
                props.login(login);
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
      <br />
      <span>vertion 0.0.1</span>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (login) => dispatch(loginAction(login)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
