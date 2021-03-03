import React from "react";
import classnames from "classnames";

import classes from "./input.module.scss";

const Input = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      required={props.required}
      className={classnames(props.className, classes.input)}
      disabled={props.disabled}
      placeholder={props.placeholder}
      autoComplete="off"
    ></input>
  );
};

export default Input;
