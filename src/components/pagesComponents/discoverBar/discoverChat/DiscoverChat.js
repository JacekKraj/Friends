import React from 'react';
import { connect } from 'react-redux';

import classes from './discoverChat.module.scss';
import SectionTitle from './../sectionTitile/SectionTitle';
import ChatUser from './chatUser/ChatUser';
import NoUsersInfo from './../noUsersInfo/NoUsersInfo';

const DiscoverChat = (props) => {
  const { followedUsers, chatNotifications, unfollowedUsers, currentChat } = props;

  const followedUsersChats = followedUsers.map((user) => {
    const isNotification = chatNotifications?.includes(user.modifiedEmail);
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
    if (chatNotifications?.includes(user.modifiedEmail)) {
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

  const hasChatsToDisplay = followedUsers.length || chatNotifications.length;

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

const mapStateToProps = (state) => {
  return {
    followedUsers: state.userData.followedUsers,
    unfollowedUsers: state.userData.unfollowedUsers,
    chatNotifications: state.chat.notifications,
  };
};

export default connect(mapStateToProps)(DiscoverChat);
