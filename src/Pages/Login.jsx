import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import classes from "../Assets/css/Login.module.css";
import logo from "../Assets/images/logo.png";

import { AuthContext } from "../Context/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginHandler = (data, e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/admin/login", data)
      .then(function (response) {
        if (response.data.success) {
          toast.success(response.data.success, {duration: 1000});

          // set Auth value to true
          setIsLoggedIn(true);

          // set token
          localStorage.setItem("auth-token", response.data.token);

          setTimeout(() => {
            navigate("/");
          }, 1100);
        } else {
          toast.error(response.data.error, {duration: 1000});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.login__parent__container}>
      <Toaster />
      <div className={classes.left__portion}>
        <div className={classes.logo__container}>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
        <h4 className={classes.heading}>Welcome Admin!</h4>
        <h2 className={classes.sub__heading}>Login</h2>
        <form onSubmit={handleSubmit(loginHandler)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className={classes.error}>Email is required</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className={classes.error}>Valid email is required</p>
          )}

          <label className={classes.password__lable} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors?.password?.type === "required" && (
            <p className={classes.error}>Password is required</p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className={classes.error}>Atleast 6 characters required</p>
          )}
          <p className={classes.forgot__password}>
            <a>Forgot Password?</a>
          </p>

          <button type="submit">Login</button>
        </form>
      </div>
      <div className={classes.right__portion}></div>
    </div>
  );
};

export default Login;
