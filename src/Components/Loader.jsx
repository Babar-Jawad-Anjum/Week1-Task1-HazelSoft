import React, { useState } from "react";
import classes from "../Assets/css/Loader.module.css";
import RotateLoader from "react-spinners/RotateLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#01BBCF");
  return (
    <div className={classes.loader__container}>
      <RotateLoader
        color={color}
        loading={loading}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
