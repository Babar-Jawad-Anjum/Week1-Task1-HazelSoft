import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import classes from "../Assets/css/Modal.module.css";

import { RxCross2 } from "react-icons/rx";

const UserModal = ({ singleUser, modalCloseHandler }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: singleUser ? singleUser.name : "",
    email: singleUser ? singleUser.email : "",
    gender: singleUser ? singleUser.gender : "",
    phone: singleUser ? singleUser.phone : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const addUserSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/users/add-user", {
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        phone: userData.phone,
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

  const editUserSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/api/users/user/edit/${singleUser._id}`, {
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        phone: userData.phone,
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
      <div className={classes.modal__title}>
        {singleUser ? "Edit User" : "Add User"}
      </div>
      <form
        onSubmit={singleUser ? editUserSubmitHandler : addUserSubmitHandler}
      >
        <div className={classes.form__group}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={classes.form__group}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <input
          className={classes.form__submit}
          type="submit"
          value={singleUser ? "Edit User" : "Add User"}
        />
      </form>
    </div>
  );
};

export default UserModal;
