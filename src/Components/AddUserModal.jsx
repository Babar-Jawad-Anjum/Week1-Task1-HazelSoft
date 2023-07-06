import React, { useRef } from "react";
import classes from "../Assets/css/Modal.module.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Modal = ({ modalCloseHandler }) => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  const phoneNumberRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const gender = genderRef.current.value;
    const phone = phoneNumberRef.current.value;

    axios
      .post("http://localhost:4000/api/users/add-user", {
        name: name,
        email: email,
        gender: gender,
        phone: phone,
      })
      .then(function (response) {
        if (response.data.success) {
          toast.success(response.data.success);
          setTimeout(() => {
            modalCloseHandler();
            navigate("/users");
          }, 1500);
        } else {
          toast.error(response.data.error);
          setTimeout(() => {
            modalCloseHandler();
          }, 1500);
        }
      })
      .catch(function (error) {
        console.log(error);
        modalCloseHandler();
      });
  };

  return (
    <div className={classes.modal}>
      <Toaster />
      <div className={classes.modal__cancel__icon} onClick={modalCloseHandler}>
        <RxCross2 />
      </div>
      <div className={classes.modal__title}>Add User</div>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.form__group}>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required ref={nameRef} />
        </div>
        <div className={classes.form__group}>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required ref={emailRef} />
        </div>
        <div className={classes.form__group}>
          <label for="gender">Gender:</label>
          <select id="gender" name="gender" required ref={genderRef}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={classes.form__group}>
          <label for="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            ref={phoneNumberRef}
          />
        </div>

        <input className={classes.form__submit} type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Modal;