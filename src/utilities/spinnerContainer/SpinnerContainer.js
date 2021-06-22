import React from "react";

import classes from "./spinnerContainer.module.scss";
import Spinner from "./../../components/UI/spinner/Spinner";

const SpinnerContainer = () => {
  return (
    <div className={classes.spinnerContainerComponent}>
      <Spinner className={classes.spinner} />
    </div>
  );
};

export default SpinnerContainer;
