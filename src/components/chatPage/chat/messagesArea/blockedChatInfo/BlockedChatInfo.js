import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./blockedChatInfo.module.scss";

const BlockedChatInfo = (props) => {
  return (
    <div className={classes.blockedChatInfoComponenet}>
      You need to{" "}
      <NavLink exact to={`/users?user=${props.modifiedEmail}`} className={classes.link}>
        follow
      </NavLink>{" "}
      this user first to be able to send him messages.
    </div>
  );
};

export default BlockedChatInfo;
