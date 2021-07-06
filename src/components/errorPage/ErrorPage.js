import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import classes from "./errorPage.module.scss";
import Logo from "../UI/logo/Logo";

const ErrorPage = (props) => {
  return (
    <div className={classes.nofoundComponent}>
      <div className={classes.text}>
        <NavLink to="/" exact>
          <Logo />
        </NavLink>
        <h4>
          {props.error.type}
          <span>That's an error.</span>
        </h4>
        <p>
          {props.error.message}
          <span>{props.error.advice}</span>
        </p>
      </div>
      <div className={classnames(classes.imageContainer, props.className)}>
        <img src={props.error.image} alt="error image" />
      </div>
    </div>
  );
};

export default ErrorPage;
