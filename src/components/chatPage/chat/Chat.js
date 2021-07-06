import React from "react";
import { connect } from "react-redux";
import "firebase/firestore";
import { firestore } from "./../../../firebaseConfig";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import classes from "./chat.module.scss";
import MainContentWrapper from "./../../wrappers/mainContentWrapper/MainContentWrapper";
import Header from "./../../pagesComponents/header/Header";
import BottomBar from "./bottomBar/BottomBar";
import MessagesArea from "./messagesArea/MessagesArea";
import * as actions from "./../../../actions/index";

const Chat = (props) => {
  const [inputValue, setInputValue] = React.useState("");

  const messagesRef = firestore.collection(`${props.collection}`);
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  const handleChange = React.useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const sendMessage = async () => {
    await messagesRef.add({
      text: inputValue.trim(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      from: props.currUserModifiedEmail,
    });
  };

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      setInputValue("");
      sendMessage();
      const userNotfifications = props.followedUsers.find((el) => el.modifiedEmail === props.user.modifiedEmail).chat?.notifications || [];
      props.onSendNotification(props.user.modifiedEmail, [...userNotfifications, props.currUserModifiedEmail]);
      props.onSetLastChat(props.currUserModifiedEmail, props.user.modifiedEmail);
    },
    [inputValue]
  );

  return (
    <MainContentWrapper>
      <div className={classes.chatComponent}>
        <Header sectionName={props.user.name} />
        <main>
          <MessagesArea messages={messages} foreign={props.user.foreign} modifiedEmail={props.user.modifiedEmail} />
          <BottomBar handleChange={handleChange} handleSubmit={handleSubmit} value={inputValue} foreign={props.user.foreign} />
        </main>
      </div>
    </MainContentWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    followedUsers: state.userData.followedUsers,
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
    chatNotifications: state.chat.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSendNotification: (userToSend, notifications) => dispatch(actions.sendNotification(userToSend, notifications)),
    onSetLastChat: (currUser, lastChat) => dispatch(actions.setLastChat(currUser, lastChat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
