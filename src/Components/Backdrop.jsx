import React from "react";
import classes from "../Assets/css/Backdrop.module.css";

const Backdrop = ({ modalCloseHandler }) => {
  return <div onClick={modalCloseHandler} className={classes.backdrop}></div>;
};

export default Backdrop;
