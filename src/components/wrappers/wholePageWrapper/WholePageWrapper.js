import React from "react";

import classes from "./wholePageWrapper.module.scss";

const WholePageWrapper = (props) => {
  return <div className={classes.pageContentWrapperComponent}>{props.children}</div>;
};

export default WholePageWrapper;
