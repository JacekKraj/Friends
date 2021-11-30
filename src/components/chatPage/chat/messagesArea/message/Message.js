import React from 'react';
import classnames from 'classnames';

import classes from './message.module.scss';

const Message = ({ isFriendMessage, text }) => {
  return <li className={classnames(classes.messageComponent, isFriendMessage && classes.answer)}>{text}</li>;
};

export default Message;
