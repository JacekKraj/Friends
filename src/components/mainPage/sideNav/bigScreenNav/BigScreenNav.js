import React from "react";

import classes from "./bigScreenNav.module.scss";
import Logo from "../../../UI/logo/Logo";
import NavBar from "../navBar/NavBar";

const BigScreenNavBar = () => {
  return (
    <div className={classes.bigScreenNavComponent}>
      <Logo className={classes.logo} />
      <NavBar />
    </div>
  );
};

export default BigScreenNavBar;
