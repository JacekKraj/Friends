import React from 'react';
import { connect } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';

import { firestore } from './../../../firebaseConfig';
import classes from './chat.module.scss';
import MainContentWrapper from './../../wrappers/mainContentWrapper/MainContentWrapper';
import Header from './../../pagesComponents/header/Header';
import BottomBar from './bottomBar/BottomBar';
import MessagesArea from './messagesArea/MessagesArea';
import * as actions from './../../../actions/index';

const Chat = (props) => {
  const { textedUser, chattingUsers, currUserModifiedEmail, onSetLastChat, onAddNotification } = props;

  const [inputValue, setInputValue] = React.useState('');

  const messagesRef = firestore.collection(`${chattingUsers}`);
  const query = messagesRef.orderBy('createdAt').limit(1000);
  const [messages] = useCollectionData(query, { idField: 'id' });

  const changeInputValue = (newValue) => {
    setInputValue(newValue);
  };

  const sendMessage = async () => {
    await messagesRef.add({
      text: inputValue.trim(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      from: currUserModifiedEmail,
    });
  };

  const submitInput = React.useCallback(
    (e) => {
      e.preventDefault();
      setInputValue('');
      sendMessage();

      if (!textedUser.chat?.notifications?.includes(currUserModifiedEmail)) {
        onAddNotification(textedUser.modifiedEmail);
      }

      onSetLastChat(textedUser.modifiedEmail);
    },
    [inputValue]
  );

  const input = {
    value: inputValue,
    changeValue: changeInputValue,
    submit: submitInput,
  };

  return (
    <MainContentWrapper>
      <div className={classes.chatComponent} data-test='component-chat'>
        <Header sectionName={textedUser.name} />
        <main>
          <MessagesArea messages={messages} isForeignUser={textedUser.isForeign} textedUserModifiedEmail={textedUser.modifiedEmail} />
          <BottomBar input={input} isForeignUser={textedUser.isForeign} />
        </main>
      </div>
    </MainContentWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNotification: (textedUser) => dispatch(actions.addNotification(textedUser)),
    onSetLastChat: (lastChatEmail) => dispatch(actions.setLastChat(lastChatEmail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
