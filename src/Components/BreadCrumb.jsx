import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "../Assets/css/BreadCrumb.module.css";

const BreadCrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");
  return (
    <nav aria-label="breadcrumb ml-2" className={classes.breadcrumb__nav}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
          <Link className={classes.breadcrumb__link} to="/">
            Home
          </Link>
        </li>
        {paths.map((path, index) => (
          <li
            key={index}
            className="breadcrumb-item active"
            aria-current="page"
          >
            <Link
              className={classes.breadcrumb__link}
              to={`/${paths.slice(0, index + 1).join("/")}`}
            >
              {path}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
