import React from "react";
import classnames from "classnames";

import classes from "./button.module.scss";

const Button = (props) => {
  return (
    <button
      type="submit"
      disabled={props.disabled}
      data-test={props.dataTest}
      onClick={props.onClick}
      className={classnames(props.className, classes.button, props.transparent ? classes.buttonTransparent : classes.buttonNormal)}
      data-test={props.testData}
    >
      {props.children}
    </button>
  );
};

export default Button;
