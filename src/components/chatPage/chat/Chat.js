import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import { useSelector } from 'react-redux';

import { useActions } from './../../../utilities/hooks/useActions';
import { firestore } from './../../../firebaseConfig';
import classes from './chat.module.scss';
import MainContentWrapper from './../../wrappers/mainContentWrapper/MainContentWrapper';
import Header from './../../pagesComponents/header/Header';
import BottomBar from './bottomBar/BottomBar';
import MessagesArea from './messagesArea/MessagesArea';

const Chat = ({ textedUser, chattingUsers }) => {
  const { modifiedEmail } = useSelector((state) => state.userData.currentUser);
  const { setLastChat, addNotification } = useActions();

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
      from: modifiedEmail,
    });
  };

  const submitInput = React.useCallback(
    (e) => {
      e.preventDefault();
      setInputValue('');
      sendMessage();

      if (!textedUser.chat?.notifications?.includes(modifiedEmail)) {
        addNotification(textedUser.modifiedEmail);
      }

      setLastChat(textedUser.modifiedEmail);
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

export default Chat;
