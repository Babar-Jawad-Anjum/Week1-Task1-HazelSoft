import React, { useState } from "react";
import classes from "../Assets/css/Users.module.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Backdrop from "../Components/Backdrop";
import Modal from "../Components/Modal";

const Users = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const modalCloseHandler = () => {
    setIsModalOpen(prev => !prev)
  }


  return (
    <div className={classes.users__wrapper}>
      <h1 className={classes.users__top__title}>List Of User's</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{display: "flex", alignItems: "center"}}>
          <span className={classes.search__title}>Search</span>
          <input
            className={classes.search__input}
            type="text"
            name="query"
            placeholder="Search by name"
            required
          />
        </div>
        <button onClick={() => setIsModalOpen(true)} className={classes.add__user__btn}>Add User</button>
      </div>
      <table className={classes.table} id="myTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((element) => (
            <tr>
              <td>01</td>
              <td>Babar</td>
              <td>21</td>
              <td>Sweden</td>
              <td style={{ display: "flex" }}>
                <div className={classes.edit__icon__parent}>
                  <AiOutlineEdit className={classes.edit__icon} />
                </div>
                <div className={classes.delete__icon__parent}>
                  <AiOutlineDelete className={classes.delete__icon} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && <Backdrop modalCloseHandler={modalCloseHandler}/>}
      {isModalOpen && <Modal modalCloseHandler={modalCloseHandler}/>}
    </div>
  );
};

export default Users;
