import React from "react";

import classes from "./chatUser.module.scss";
import User from "./../../user/User";

const ChatUser = (props) => {
  return (
    <div className={classes.chatUserComponent} data-test="chat-user-component">
      <User profileImage={props.profileImage} name={props.name} link={`/${props.modifiedEmail}`} />
      <div className={classes.arrow}>{`>`}</div>
    </div>
  );
};

export default ChatUser;
