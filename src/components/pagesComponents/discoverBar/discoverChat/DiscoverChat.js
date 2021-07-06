import React from "react";
import { connect } from "react-redux";

import classes from "./discoverChat.module.scss";
import SectionTitle from "./../sectionTitile/SectionTitle";
import ChatUser from "./chatUser/ChatUser";
import NoUsersInfo from "./../noUsersInfo/NoUsersInfo";

const DiscoverChat = (props) => {
  return (
    <div className={classes.discoverChatComponent}>
      <SectionTitle title="Chat" />
      <div className={classes.chat}>
        {props.followedUsers.length || props.chatNotifications.length ? (
          <React.Fragment>
            {props.followedUsers.map((el) => {
              const isNotification = props.chatNotifications?.includes(el.modifiedEmail);
              return (
                <ChatUser
                  name={el.name}
                  currChat={props.currentChat === el.modifiedEmail}
                  modifiedEmail={el.modifiedEmail}
                  key={el.modifiedEmail}
                  profileImage={el.profileImage}
                  isNotification={isNotification}
                />
              );
            })}
            {props.unfollowedUsers.map((el) => {
              if (props.chatNotifications?.includes(el.modifiedEmail)) {
                return (
                  <ChatUser
                    name={el.name}
                    currChat={props.currentChat === el.modifiedEmail}
                    modifiedEmail={el.modifiedEmail}
                    key={el.modifiedEmail}
                    profileImage={el.profileImage}
                    isNotification={true}
                    foreign={true}
                  />
                );
              }
            })}
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
    currUserEmail: state.userData.currentUser.modifiedEmail,
  };
};

export default connect(mapStateToProps)(DiscoverChat);
