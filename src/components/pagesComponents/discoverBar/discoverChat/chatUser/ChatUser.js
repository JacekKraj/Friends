import React from 'react';
import classnames from 'classnames';

import classes from './chatUser.module.scss';
import User from './../../user/User';

const ChatUser = (props) => {
  const { user, isCurrChat, isForeignUser, isNotification } = props;

  return (
    <div
      className={classnames(classes.chatUserComponent, isCurrChat && classes.currChat, isForeignUser && classes.foreign)}
      data-test='chat-user-component'
    >
      <User user={user} currChat={user.currChat} navigateTo={`/chat?to=${user.modifiedEmail}`} isNotification={isNotification} />
      <div className={classes.arrow}>{`>`}</div>
    </div>
  );
};

export default ChatUser;
