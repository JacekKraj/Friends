import React from "react";

import classes from "./bigScreenNavBar.module.scss";
import Logo from "./../../../UI/logo/Logo";
import NavBar from "./../NavBar";

const BigScreenNavBar = () => {
  return (
    <div className={classes.bigScreenNavBarComponent}>
      <Logo className={classes.logo} />
      <NavBar />
    </div>
  );
};

export default BigScreenNavBar;
