import React, { useRef } from "react";
import classes from "../Assets/css/Login.module.css";
import logo from "../Assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    alert(email)
    alert(password)
    axios
      .post("http://localhost:4000/api/admin/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.success) {
          alert(response.data.success);
        } else {
          alert(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.login__parent__container}>
      <div className={classes.left__portion}>
        <div className={classes.logo__container}>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
        <h4 className={classes.heading}>Welcome Admin!</h4>
        <h2 className={classes.sub__heading}>Login</h2>
        <form onSubmit={loginHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            ref={emailRef}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            ref={passwordRef}
            required
          />
          <p className={classes.forgot__password}>
            <a href="">Forgot Password?</a>
          </p>

          <button type="submit">Login</button>
        </form>
      </div>
      <div className={classes.right__portion}></div>
    </div>
  );
};

export default Login;
