import React from 'react';
import { useSelector } from 'react-redux';

import classes from './messagesArea.module.scss';
import Message from './message/Message';
import Spinner from './../../../UI/spinner/Spinner';
import BlockedChatInfo from './blockedChatInfo/BlockedChatInfo';

const MessagesArea = ({ messages, isForeignUser, textedUserModifiedEmail }) => {
  const { modifiedEmail } = useSelector((state) => state.userData.currentUser);

  const scrollBottomRef = React.useRef();

  React.useEffect(() => {
    scrollBottomRef.current?.scrollIntoView();
  });

  return (
    <React.Fragment>
      <ul className={classes.messagesAreaComponent}>
        {messages ? (
          messages.map((message) => {
            return <Message text={message.text} key={message.id} isFriendMessage={modifiedEmail !== message.from} />;
          })
        ) : (
          <Spinner />
        )}
        <li ref={scrollBottomRef}></li>
      </ul>
      <div className={classes.infoRef}>{isForeignUser && <BlockedChatInfo textedUserModifiedEmail={textedUserModifiedEmail} />}</div>
    </React.Fragment>
  );
};

export default MessagesArea;
