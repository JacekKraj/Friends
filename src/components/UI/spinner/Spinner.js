import React from "react";
import classnames from "classnames";

import classes from "./spinner.module.scss";

const Spinner = (props) => {
  return (
    <div className={classes.spinnerCenter} data-test="component-spinner">
      <div className={classnames(classes.loader, props.className)}></div>
    </div>
  );
};

export default Spinner;
