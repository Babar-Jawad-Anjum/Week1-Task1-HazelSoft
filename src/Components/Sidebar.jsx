import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import classes from "../Assets/css/Sidebar.module.css";
import logo from "../Assets/images/logo.png";

import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  MdOutlineDashboardCustomize,
  MdOutlineAddToDrive,
} from "react-icons/md";

import { AuthContext } from "../Context/Auth";

const Sidebar = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [active, setActive] = useState(0);

  const sideBarHandler = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className={classes.sidebar__parent__container}>
      <div
        className={classes.sidebar}
        style={{
          width: isOpenSidebar ? "300px" : "50px",
          position: "sticky",
          top: 0,
        }}
      >
        <div className={classes.hamburger}>
          <RxHamburgerMenu onClick={sideBarHandler} />
        </div>
        <div
          style={{ display: isOpenSidebar ? "block" : "none" }}
          className={classes.sidebar__logo__container}
        >
          <img
            className={classes.sidebar__logo}
            src={logo}
            alt="sidebar_logo"
          />
        </div>
        <div style={{ marginTop: isOpenSidebar ? "0" : "70px" }}>
          <NavLink
            onClick={() => setActive(0)}
            style={active === 0 ? { background: "#025c91" } : null}
            to="/"
            className={classes.link}
          >
            <div className={classes.icon}>
              <MdOutlineDashboardCustomize />
            </div>
            <div
              style={{ display: isOpenSidebar ? "block" : "none" }}
              className={classes.link__text}
            >
              Dashboard
            </div>
          </NavLink>
          <NavLink
            onClick={() => setActive(1)}
            style={active === 1 ? { background: "#025c91" } : null}
            to="/users"
            className={classes.link}
          >
            <div className={classes.icon}>
              <AiOutlineUser />
            </div>
            <div
              style={{ display: isOpenSidebar ? "block" : "none" }}
              className={classes.link__text}
            >
              Users
            </div>
          </NavLink>
          <NavLink
            onClick={() => setActive(2)}
            style={active === 2 ? { background: "#025c91" } : null}
            to="/add-user"
            className={classes.link}
          >
            <div className={classes.icon}>
              <MdOutlineAddToDrive />
            </div>
            <div
              style={{ display: isOpenSidebar ? "block" : "none" }}
              className={classes.link__text}
            >
              Add User
            </div>
          </NavLink>
          <NavLink className={classes.link} onClick={handleLogout}>
            <div className={classes.icon}>
              <AiOutlineLogout />
            </div>
            <div
              style={{ display: isOpenSidebar ? "block" : "none" }}
              className={classes.link__text}
            >
              Logout
            </div>
          </NavLink>
        </div>
      </div>
      <main className={classes.sidebar__children}>
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
