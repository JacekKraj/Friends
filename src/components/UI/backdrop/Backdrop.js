import React from "react";

import classes from "./backdrop.module.scss";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop} data-test="component-backdrop"></div>;
};

export default Backdrop;
