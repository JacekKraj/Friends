import React from "react";

import classes from "./mainContentWrapper.module.scss";

const MainContentWrapper = (props) => {
  return <div className={classes.mainContentWrapperComponent}>{props.children}</div>;
};

export default MainContentWrapper;
