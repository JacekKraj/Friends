import React from "react";
import classnames from "classnames";

import classes from "./chatUser.module.scss";
import User from "./../../user/User";

const ChatUser = (props) => {
  return (
    <div
      className={classnames(classes.chatUserComponent, props.currChat && classes.currChat, props.foreign && classes.foreign)}
      data-test="chat-user-component"
    >
      <User
        profileImage={props.profileImage}
        name={props.name}
        currChat={props.currChat}
        link={`/chat?to=${props.modifiedEmail}`}
        isNotification={props.isNotification}
      />
      <div className={classes.arrow}>{`>`}</div>
    </div>
  );
};

export default ChatUser;
