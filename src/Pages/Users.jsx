import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import classes from "../Assets/css/Users.module.css";
import { useNavigate } from "react-router-dom";

import Backdrop from "../Components/Backdrop";
import UserModal from "../Components/UserModal";

import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSortAscending,
} from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setUsers } from "../redux/actions/usersActions";
import Loader from "../Components/Loader";
import { setIsLoading } from "../redux/actions/loadingAction";

const LIMIT = 5;

const totalPagesCalculator = (total, limit) => {
  //Check if total/count remainder is 0 or not
  let totalCounter;
  if (total % limit === 0) {
    totalCounter = parseInt(total / limit);
  } else {
    totalCounter = parseInt(total / limit) + 1;
  }
  const pages = [];
  for (let x = 1; x <= totalCounter; x++) {
    pages.push(x);
  }
  return pages;
};

const Users = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers.users);
  const editUser = useSelector((state) => state.selectedUser);
  const isLoading = useSelector((state) => state.isLoading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editUser, setEditUser] = useState(null);
  const [searchItem, setSearchItem] = useState("");

  //Flag for users api calls when user adds or changed
  const [flag, setFlag] = useState(false);

  // pagination states
  const [totalUsers, setTotalUsers] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const getUsers = () => {
    dispatch(setIsLoading());
    axios
      .get("http://localhost:4000/api/users/getAllUsers", {
        params: {
          page: activePage,
          size: LIMIT,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setTotalUsers(() => response.data.totalRecords);
          dispatch(setUsers(response.data.users));
          dispatch(setIsLoading());
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setIsLoading());
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
    dispatch(setSelectedUser(null));
    setIsModalOpen((prev) => !prev);
  };

  // Get Single User For Edit
  const getUserToEdit = (userId) => {
    dispatch(setIsLoading());
    axios
      .get(`http://localhost:4000/api/users/getUser/${userId}`)
      .then((response) => {
        setTimeout(() => {
          dispatch(setSelectedUser(response.data.user));
          dispatch(setIsLoading());
          setIsModalOpen(true);
        }, 700);
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
  const sortHandler = (sortType) => {
    axios
      .get("http://localhost:4000/api/users/sort", {
        params: {
          page: activePage,
          size: LIMIT,
          sortType: sortType,
        },
      })
      .then((response) => {
        dispatch(setUsers(response.data.sortedUsers));
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
          {/* <button
            onClick={sortUsersHandler}
            className={classes.sort__users__btn}
          >
            Sort Users
          </button> */}
        </div>
      </div>
      <table className={classes.table} id="myTable">
        <thead>
          <tr>
            <th onClick={() => sortHandler("sortByName")}>
              <span className={classes.table__head}>
                Name
                <AiOutlineSortAscending className={classes.table__head__icon} />
              </span>
            </th>

            <th onClick={() => sortHandler("sortByEmail")}>
              <span className={classes.table__head}>
                Email
                <AiOutlineSortAscending className={classes.table__head__icon} />
              </span>
            </th>
            <th onClick={() => sortHandler("sortByGender")}>
              <span className={classes.table__head}>
                Gender
                <AiOutlineSortAscending className={classes.table__head__icon} />
              </span>
            </th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            users
              .filter((element) => {
                if (searchItem === "") {
                  return element;
                } else if (
                  element.name.toLowerCase().includes(searchItem.toLowerCase())
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
              ))}
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

      {isLoading && <Backdrop />}
      {isLoading && <Loader />}

      {/* User Modal */}
      {isModalOpen && <Backdrop modalCloseHandler={modalCloseHandler} />}
      {isModalOpen && (
        <UserModal
          editUser={editUser}
          setFlag={setFlag}
          modalCloseHandler={modalCloseHandler}
        />
      )}
    </div>
  );
};

export default Users;
