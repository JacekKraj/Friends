import React from 'react';
import { useSelector } from 'react-redux';

import classes from './discoverChat.module.scss';
import SectionTitle from './../sectionTitile/SectionTitle';
import ChatUser from './chatUser/ChatUser';
import NoUsersInfo from './../noUsersInfo/NoUsersInfo';

const DiscoverChat = ({ currentChat }) => {
  const { followedUsers, unfollowedUsers } = useSelector((state) => state.userData);
  const { notifications } = useSelector((state) => state.chat);

  const followedUsersChats = followedUsers.map((user) => {
    const isNotification = notifications?.includes(user.modifiedEmail);
    const { name, modifiedEmail, profileImage } = user;
    return (
      <ChatUser
        user={{ name, profileImage, modifiedEmail }}
        isCurrChat={currentChat === modifiedEmail}
        key={modifiedEmail}
        isNotification={isNotification}
      />
    );
  });

  const unfollowedUsersChats = unfollowedUsers.map((user) => {
    if (notifications?.includes(user.modifiedEmail)) {
      const { name, modifiedEmail, profileImage } = user;
      return (
        <ChatUser
          user={{ name, profileImage, modifiedEmail }}
          isCurrChat={currentChat === user.modifiedEmail}
          key={user.modifiedEmail}
          isNotification={true}
          isForeignUser={true}
        />
      );
    }
  });

  const hasChatsToDisplay = followedUsers.length || notifications.length;

  return (
    <div className={classes.discoverChatComponent}>
      <SectionTitle title='Chat' />
      <div className={classes.chat}>
        {hasChatsToDisplay ? (
          <React.Fragment>
            {followedUsersChats}
            {unfollowedUsersChats}
          </React.Fragment>
        ) : (
          <NoUsersInfo>Follow other users to start chatting with them.</NoUsersInfo>
        )}
      </div>
    </div>
  );
};

export default DiscoverChat;
