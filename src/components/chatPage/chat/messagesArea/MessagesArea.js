import React from "react";

import classes from "./messagesArea.module.scss";
import Message from "./message/Message";

const MessagesArea = () => {
  const scrollBottomRef = React.useRef();
  React.useEffect(() => {
    scrollBottomRef.current.scrollIntoView();
  }, []);
  return (
    <ul className={classes.messagesAreaComponent}>
      <Message />
      <Message friend={true} />
      <Message />
      <div ref={scrollBottomRef}></div>
    </ul>
  );
};

export default MessagesArea;
