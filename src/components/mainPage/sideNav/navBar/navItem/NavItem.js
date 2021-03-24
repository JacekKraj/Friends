import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./navItem.module.scss";

const NavItem = (props) => {
  return (
    <NavLink to={props.link} onClick={props.onClick} activeClassName={props.link !== "/" ? classes.activeClassName : null}>
      <div className={classes.navItemComponent}>
        <div className={classes.iconContainer}>{props.icon}</div>
        <p className={classes.description}>{props.description}</p>
      </div>
    </NavLink>
  );
};

export default NavItem;
