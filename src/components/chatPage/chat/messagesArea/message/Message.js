import React from "react";
import classnames from "classnames";

import classes from "./message.module.scss";

const Message = (props) => {
  return (
    <li className={classnames(classes.messageComponent, props.friend && classes.answer)}>
      Pan woźny oto broli broli bez zęboli odorem śmierdzi mu z gęby koza wypierdziala mu zeby w dupie schowek ma swoj z geby leci mu gnoj
    </li>
  );
};

export default Message;
