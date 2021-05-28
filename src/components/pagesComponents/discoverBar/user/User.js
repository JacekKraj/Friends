import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./user.module.scss";

const User = (props) => {
  return (
    <NavLink to={props.link} className={classes.userComponent} data-test={props.dataTest}>
      <img className={classes.image} src={props.profileImage} />
      <p className={classes.name}>{props.name}</p>
    </NavLink>
  );
};

export default User;
