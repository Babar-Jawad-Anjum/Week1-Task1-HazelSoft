import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import classes from "../Assets/css/Login.module.css";
import logo from "../Assets/images/logo.png";

import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { HiOutlineMinusSm } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { setIsLogged } from "../redux/actions/authActions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Flags to check if user clicks login button without entering credentials
  const [emailEmptyClick, setEmailEmptyClick] = useState(true);
  const [passEmptyClick, setPassEmptyClick] = useState(true);
  // ----------------------------------------------------------------------

  //States to check all the required validation rules met or not
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  // -------------------------------------------------------------

  //State to Shows errors when email and password fields are empty
  const [emailError, setEmailEror] = useState(false);
  const [initialErrorState, setInitialErrorState] = useState({
    hasUpperCase: true,
    hasLowerCase: true,
    hasSpecialChar: true,
    hasNumber: true,
    passwordLength: true,
  });
  // ---------------------------------------------------------------

  //Last check if users entered proper email and password according to validation rules
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  // ------------------------------------------------------------------------------------

  const loginHandler = (data, e) => {
    e.preventDefault();

    //Check if email field is empty and user clicks login button
    if (emailEmptyClick) {
      setEmailEror(true);
    } else {
      setEmailEror(false);
    }

    //check if password field is empty and user clicks login button
    if (passEmptyClick) {
      setInitialErrorState((prevState) => ({
        ...prevState,
        hasUpperCase: false,
        hasLowerCase: false,
        hasSpecialChar: false,
        hasNumber: false,
        passwordLength: false,
      }));
    }

    //Login Clicks handler when validation passed
    if (isValidEmail && isValidPassword) {
      axios
        .post("http://localhost:4000/api/admin/login", data)
        .then(function (response) {
          if (response.data.success) {
            toast.success(response.data.success, { duration: 1000 });

            // set Auth value to true
            dispatch(setIsLogged());

            // set token
            localStorage.setItem("auth-token", response.data.token);

            setTimeout(() => {
              navigate("/");
            }, 1100);
          } else {
            toast.error(response.data.error, { duration: 1000 });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;

    if (email.length === 0) {
      setEmailEmptyClick(true);
    } else {
      setEmailEmptyClick(false);
      setEmailEror(false);
    }

    const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

    if (isValidEmail) {
      console.log("valid");
      setIsValidEmail(true);
    } else {
      console.log("Invalid");
      setIsValidEmail(false);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    if (e.target.value !== 0) {
      setPassEmptyClick(false);
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);

    // Check Upper Case character
    if (hasUpperCase) {
      setInitialErrorState((prevState) => ({
        ...prevState,
        hasUpperCase: false,
      }));

      setHasUpperCase(true);
    } else {
      setHasUpperCase(false);
    }

    // Check lower Case character
    if (hasLowerCase) {
      setInitialErrorState((prevState) => ({
        ...prevState,
        hasLowerCase: false,
      }));
      setHasLowerCase(true);
    } else {
      setHasLowerCase(false);
    }

    // Check special character
    if (hasSpecialChar) {
      setInitialErrorState((prevState) => ({
        ...prevState,
        hasSpecialChar: false,
      }));
      setHasSpecialChar(true);
    } else {
      setHasSpecialChar(false);
    }
    // Check digit character
    if (hasNumber) {
      setInitialErrorState((prevState) => ({
        ...prevState,
        hasNumber: false,
      }));
      setHasNumber(true);
    } else {
      setHasNumber(false);
    }

    // Check digit character
    if (password.length >= 8) {
      setInitialErrorState((prevState) => ({
        ...prevState,
        passwordLength: false,
      }));
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }

    if (
      hasUpperCase &&
      hasLowerCase &&
      hasSpecialChar &&
      hasNumber &&
      password.length >= 8
    ) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
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
            {...register("email")}
            onChange={handleEmailChange}
          />
          {emailError ? (
            <p className={classes.invalid}>
              <span>Email is required</span>
            </p>
          ) : null}
          {!isValidEmail && !emailEmptyClick ? (
            <p className={classes.invalid}>
              <span>Valid Email is required</span>
            </p>
          ) : null}

          <label className={classes.password__lable} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            {...register("password")}
            onChange={handlePasswordChange}
          />

          {/* {passwordError && <p className={classes.error}>{passwordError}</p>} */}
          <p
            className={
              initialErrorState.passwordLength
                ? classes.simple_message
                : passwordLength
                ? classes.valid
                : classes.invalid
            }
          >
            <span className={classes.icon__error}>
              {initialErrorState.passwordLength ? (
                <HiOutlineMinusSm />
              ) : passwordLength ? (
                <TiTick />
              ) : (
                <RxCross2 />
              )}
            </span>
            <span>At least eight characters</span>
          </p>
          <p
            className={
              initialErrorState.hasSpecialChar
                ? classes.simple_message
                : hasSpecialChar
                ? classes.valid
                : classes.invalid
            }
          >
            <span className={classes.icon__error}>
              {initialErrorState.hasSpecialChar ? (
                <HiOutlineMinusSm />
              ) : hasSpecialChar ? (
                <TiTick />
              ) : (
                <RxCross2 />
              )}
            </span>
            <span>At least one special character</span>
          </p>
          <p
            className={
              initialErrorState.hasUpperCase
                ? classes.simple_message
                : hasUpperCase
                ? classes.valid
                : classes.invalid
            }
          >
            <span className={classes.icon__error}>
              {initialErrorState.hasUpperCase ? (
                <HiOutlineMinusSm />
              ) : hasUpperCase ? (
                <TiTick />
              ) : (
                <RxCross2 />
              )}
            </span>
            <span> At least one uppercase character</span>
          </p>
          <p
            className={
              initialErrorState.hasLowerCase
                ? classes.simple_message
                : hasLowerCase
                ? classes.valid
                : classes.invalid
            }
          >
            <span className={classes.icon__error}>
              {initialErrorState.hasLowerCase ? (
                <HiOutlineMinusSm />
              ) : hasLowerCase ? (
                <TiTick />
              ) : (
                <RxCross2 />
              )}
            </span>
            <span> At least one lowercase character</span>
          </p>
          <p
            className={
              initialErrorState.hasNumber
                ? classes.simple_message
                : hasNumber
                ? classes.valid
                : classes.invalid
            }
          >
            <span className={classes.icon__error}>
              {initialErrorState.hasNumber ? (
                <HiOutlineMinusSm />
              ) : hasNumber ? (
                <TiTick />
              ) : (
                <RxCross2 />
              )}
            </span>
            <span>At least one number required</span>
          </p>

          <button type="submit">Login</button>
        </form>
      </div>
      <div className={classes.right__portion}></div>
    </div>
  );
};

export default Login;
