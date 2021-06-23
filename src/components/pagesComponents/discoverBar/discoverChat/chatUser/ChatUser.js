import React from "react";
import { connect } from "react-redux";

import classes from "./chatUser.module.scss";
import User from "./../../user/User";

const ChatUser = (props) => {
  return (
    <div className={classes.chatUserComponent} data-test="chat-user-component">
      <User profileImage={props.profileImage} name={props.name} link={`/chat?to=${props.modifiedEmail}`} />
      <div className={classes.arrow}>{`>`}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currUserModifedEmail: state.userData.currentUser.modifiedEmail,
  };
};

export default connect(mapStateToProps)(ChatUser);
