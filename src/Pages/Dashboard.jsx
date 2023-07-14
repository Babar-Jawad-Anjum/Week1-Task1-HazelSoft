import React from "react";
import classes from "../Assets/css/Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={classes.dashboard__container}>
      <h1 className={classes.top__title}>Welcome, Admin</h1>
      <div className={classes.image__container}>
        <img
          className={classes.image}
          src="https://cdn.labmanager.com/assets/articleNo/29645/aImg/53266/reading-a-bar-chart-versus-a-line-graph-biases-our-judgement-l.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Dashboard;
