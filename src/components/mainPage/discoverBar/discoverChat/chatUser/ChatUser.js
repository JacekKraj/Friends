import React from "react";
import { NavLink } from "react-router-dom";

import defaultUserImage from "./../../../../../assets/images/defaultUserImage.png";
import classes from "./chatUser.module.scss";

const ChatUser = (props) => {
  return (
    <div className={classes.chatUserComponent}>
      <NavLink to={`/${props.modifiedEmail}`}>
        <img className={classes.image} src={props.profileImage ? props.profileImage : defaultUserImage} />
        <p className={classes.name}>{props.name}</p>
      </NavLink>
      <div className={classes.arrow}>{`>`}</div>
    </div>
  );
};

export default ChatUser;
