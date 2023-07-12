import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import classes from "../Assets/css/Modal.module.css";

import { RxCross2 } from "react-icons/rx";

const UserModal = ({ editUser, modalCloseHandler, setFlag }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: editUser ? editUser.name : "",
    email: editUser ? editUser.email : "",
    gender: editUser ? editUser.gender : "",
    phone: editUser ? editUser.phone : "",
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
            setFlag(true);
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
      .post(`http://localhost:4000/api/users/user/edit/${editUser._id}`, {
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        phone: userData.phone,
      })
      .then(function (response) {
        if (response.data.success) {
          toast.success(response.data.success);
          setTimeout(() => {
            setFlag(true);
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
        {editUser ? "Edit User" : "Add User"}
      </div>
      <form
        onSubmit={editUser ? editUserSubmitHandler : addUserSubmitHandler}
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
            <option value="male" selected={userData.gender === "male"}>
              Male
            </option>
            <option value="female" selected={userData.gender === "female"}>
              Female
            </option>
            <option value="other" selected={userData.gender === "other"}>
              Other
            </option>
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
          value={editUser ? "Edit User" : "Add User"}
        />
      </form>
    </div>
  );
};

export default UserModal;
