import React from "react";
import { connect } from "react-redux";

import classes from "./messagesArea.module.scss";
import Message from "./message/Message";
import Spinner from "./../../../UI/spinner/Spinner";
import BlockedChatInfo from "./blockedChatInfo/BlockedChatInfo";

const MessagesArea = (props) => {
  const scrollBottomRef = React.useRef();
  React.useEffect(() => {
    scrollBottomRef.current.scrollIntoView();
  });
  return (
    <React.Fragment>
      <ul className={classes.messagesAreaComponent}>
        {props.messages ? (
          props.messages?.map((el) => {
            return <Message text={el.text} key={el.createdAt + el.text} friend={props.currUserModifiedEmail !== el.from} />;
          })
        ) : (
          <Spinner />
        )}
        <li ref={scrollBottomRef}></li>
      </ul>
      <div className={classes.infoRef}>{props.foreign && <BlockedChatInfo modifiedEmail={props.modifiedEmail} />}</div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

export default connect(mapStateToProps)(MessagesArea);
