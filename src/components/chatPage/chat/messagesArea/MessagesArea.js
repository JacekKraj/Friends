import React from 'react';
import { connect } from 'react-redux';

import classes from './messagesArea.module.scss';
import Message from './message/Message';
import Spinner from './../../../UI/spinner/Spinner';
import BlockedChatInfo from './blockedChatInfo/BlockedChatInfo';

const MessagesArea = (props) => {
  const { messages, isForeignUser, textedUserModifiedEmail, currUserModifiedEmail } = props;

  const scrollBottomRef = React.useRef();

  React.useEffect(() => {
    scrollBottomRef.current.scrollIntoView();
  });

  return (
    <React.Fragment>
      <ul className={classes.messagesAreaComponent}>
        {messages ? (
          messages.map((message) => {
            return <Message text={message.text} key={message.createdAt + message.text} isFriendMessage={currUserModifiedEmail !== message.from} />;
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

const mapStateToProps = (state) => {
  return {
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

export default connect(mapStateToProps)(MessagesArea);
