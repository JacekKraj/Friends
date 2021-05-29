import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./bigScreenNav.module.scss";
import Logo from "../../../UI/logo/Logo";
import NavBar from "../navBar/NavBar";

const BigScreenNavBar = () => {
  return (
    <div className={classes.bigScreenNavComponent}>
      <NavLink to="/" exact>
        <Logo className={classes.logo} />
      </NavLink>
      <NavBar />
    </div>
  );
};

export default BigScreenNavBar;
