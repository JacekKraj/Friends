import React from "react";

import classes from "./userInfo.module.scss";

const UserInfo = (props) => {
  return (
    <div className={classes.userInfoComponent} data-test="user-info-component">
      {props.icon}
      <p className={classes.text}>{props.text}</p>
    </div>
  );
};

export default UserInfo;
