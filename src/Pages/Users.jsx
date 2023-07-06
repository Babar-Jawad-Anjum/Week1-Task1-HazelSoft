import React, { useEffect, useState } from "react";
import classes from "../Assets/css/Users.module.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Backdrop from "../Components/Backdrop";
import Modal from "../Components/AddUserModal";
import axios from "axios";
import EditModal from "../Components/EditUserModal";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Users = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const getUsers = () => {
      axios
        .get("http://localhost:4000/api/users/getAllUsers")
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUsers();
  }, []);

  const modalCloseHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getUserToEdit = (userId) => {
    axios
      .get(`http://localhost:4000/api/users/getUser/${userId}`)
      .then((response) => {
        setSingleUser(response.data.user);
        setIsEditModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteUserHandler = (userId) => {
    axios
      .delete(`http://localhost:4000/api/users/delete/${userId}`)
      .then((response) => {
        toast.success(response.data.success);
        setTimeout(() => {
          navigate("/users");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editModalCloseHandler = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const onChangeSearch = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <div className={classes.users__wrapper}>
      <Toaster />
      <h1 className={classes.users__top__title}>List Of User's</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className={classes.search__title}>Search</span>
          <input
            className={classes.search__input}
            type="text"
            name="query"
            placeholder="Search by name"
            onChange={onChangeSearch}
            required
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={classes.add__user__btn}
        >
          Add User
        </button>
      </div>
      <table className={classes.table} id="myTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users
                .filter((element) => {
                  if (searchItem === "") {
                    return element;
                  } else if (
                    element.name
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return element;
                  }
                })
                .map((element) => (
                  <tr key={element._id}>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.gender}</td>
                    <td>{element.phone}</td>
                    <td>Active</td>
                    <td style={{ display: "flex" }}>
                      <div
                        onClick={() => getUserToEdit(element._id)}
                        className={classes.edit__icon__parent}
                      >
                        <AiOutlineEdit className={classes.edit__icon} />
                      </div>
                      <div
                        onClick={() => deleteUserHandler(element._id)}
                        className={classes.delete__icon__parent}
                      >
                        <AiOutlineDelete className={classes.delete__icon} />
                      </div>
                    </td>
                  </tr>
                ))
            : "Loading..."}
        </tbody>
      </table>
      {isModalOpen && <Backdrop modalCloseHandler={modalCloseHandler} />}
      {isModalOpen && <Modal modalCloseHandler={modalCloseHandler} />}
      {isEditModalOpen && (
        <Backdrop editModalCloseHandler={editModalCloseHandler} />
      )}
      {isEditModalOpen && (
        <EditModal
          singleUser={singleUser}
          editModalCloseHandler={editModalCloseHandler}
        />
      )}
    </div>
  );
};

export default Users;
