import React from "react";

import classes from "./noUsersInfo.module.scss";

const NoUsersInfo = (props) => {
  return (
    <p data-test="no-users-info" className={classes.info}>
      {props.children}
    </p>
  );
};

export default NoUsersInfo;
