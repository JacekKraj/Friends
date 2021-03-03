import React from "react";

import classes from "./spinner.module.scss";

const Spinner = (props) => {
  return (
    <div className={classes.spinnerCenter} data-test="component-spinner">
      <div className={classes.loader}></div>
    </div>
  );
};

export default Spinner;
