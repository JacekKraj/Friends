import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './blockedChatInfo.module.scss';

const BlockedChatInfo = ({ textedUserModifiedEmail }) => {
  return (
    <div className={classes.blockedChatInfoComponenet} data-test='component-blocked-chat-info'>
      You need to{' '}
      <NavLink exact to={`/users?user=${textedUserModifiedEmail}`} className={classes.link}>
        follow
      </NavLink>{' '}
      this user first to be able to send him messages.
    </div>
  );
};

export default BlockedChatInfo;
