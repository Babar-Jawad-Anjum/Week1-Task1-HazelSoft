import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import classes from "../Assets/css/Users.module.css";
import { useNavigate } from "react-router-dom";

import Backdrop from "../Components/Backdrop";
import UserModal from "../Components/UserModal";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const LIMIT = 5;

const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for (let x = 1; x <= parseInt(total / limit); x++) {
    pages.push(x);
  }
  return pages;
};

const Users = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [flag, setFlag] = useState(false);

  // pagination states
  const [totalUsers, setTotalUsers] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const getUsers = () => {
    axios
      .get("http://localhost:4000/api/users/getAllUsers", {
        params: {
          page: activePage,
          size: LIMIT,
        },
      })
      .then((response) => {
        setUsers(() => response.data.users);
        setTotalUsers(() => response.data.totalRecords);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, [activePage]);

  useEffect(() => {
    if (flag) {
      getUsers();
      setFlag(false);
    }
  }, [flag]);

  // Add New User Button click handler
  const addUserButtonHandler = () => {
    setSingleUser(null);
    setIsModalOpen((prev) => !prev);
  };

  // Get Single User For Edit
  const getUserToEdit = (userId) => {
    axios
      .get(`http://localhost:4000/api/users/getUser/${userId}`)
      .then((response) => {
        setSingleUser(response.data.user);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Edit modal close handler
  const modalCloseHandler = () => {
    setIsModalOpen((prev) => !prev);
  };

  //Delete Single User Handler
  const deleteUserHandler = (userId) => {
    axios
      .delete(`http://localhost:4000/api/users/delete/${userId}`)
      .then((response) => {
        toast.success(response.data.success);
        setFlag(true);
        setTimeout(() => {
          navigate("/users");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Set Search User Value
  const onChangeSearch = (e) => {
    setSearchItem(e.target.value);
  };

  // Sort Users By Name Handler
  const sortUsersHandler = () => {
    axios
      .get("http://localhost:4000/api/users/sortUsers", {
        params: {
          page: activePage,
          size: LIMIT,
        },
      })
      .then((response) => {
        setUsers(response.data.sortedUsers);
        toast.success("Users Sorted Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.users__wrapper}>
      <Toaster />
      <h1 className={classes.users__top__title}>List Of User's</h1>
      <div className={classes.users__top__bar}>
        <div className={classes.search__bar}>
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
        <div>
          <button
            onClick={addUserButtonHandler}
            className={classes.add__user__btn}
          >
            Add User
          </button>
          <button
            onClick={sortUsersHandler}
            className={classes.sort__users__btn}
          >
            Sort Users
          </button>
        </div>
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
                    <td className={classes.edit__delete__btn__wrapper}>
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

      <nav>
        <ul className={classes.pagination}>
          {activePage !== 1 && (
            <IoIosArrowBack
              onClick={() => setActivePage(activePage - 1)}
              className={classes.pagination__prev_btn}
            />
          )}
          {totalPagesCalculator(totalUsers, LIMIT).map((pageNo) => (
            <li
              className={`${classes.pageItem} ${
                activePage === pageNo
                  ? classes.pagination__active_btn
                  : classes.pagination__inaActive_btn
              }`}
              key={pageNo}
              onClick={() => setActivePage(pageNo)}
            >
              <a className={classes.pageLink}>{pageNo}</a>
            </li>
          ))}
          {activePage !== parseInt(totalUsers / LIMIT) && (
            <IoIosArrowForward
              onClick={() => setActivePage(activePage + 1)}
              className={classes.pagination__next_btn}
            />
          )}
        </ul>
      </nav>

      {/* User Modal */}
      {isModalOpen && <Backdrop modalCloseHandler={modalCloseHandler} />}
      {isModalOpen && (
        <UserModal
          singleUser={singleUser}
          modalCloseHandler={modalCloseHandler}
        />
      )}
    </div>
  );
};

export default Users;
