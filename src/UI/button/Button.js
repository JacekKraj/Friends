import React from "react";
import classnames from "classnames";

import classes from "./button.module.scss";

const Button = (props) => {
  return (
    <button
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
      className={classnames(props.className, classes.button, props.transparent ? classes.buttonTransparent : classes.buttonNormal)}
    >
      {props.children}
    </button>
  );
};

export default Button;
