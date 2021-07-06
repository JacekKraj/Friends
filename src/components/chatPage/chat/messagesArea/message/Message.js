import React from "react";
import classnames from "classnames";

import classes from "./message.module.scss";

const Message = (props) => {
  return <li className={classnames(classes.messageComponent, props.friend && classes.answer)}>{props.text}</li>;
};

export default Message;
