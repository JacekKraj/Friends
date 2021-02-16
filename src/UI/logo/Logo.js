import React from "react";
import classnames from "classnames";

import classes from "./logo.module.scss";

const Logo = (props) => {
  return (
    <div className={classnames(classes.logo, props.className)}>
      <p>f</p>
    </div>
  );
};

export default Logo;
