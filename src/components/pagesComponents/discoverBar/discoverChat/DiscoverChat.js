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
        {props.followedUsers.length ? (
          props.followedUsers.map((el) => {
            return <ChatUser name={el.name} modifiedEmail={el.modifiedEmail} key={el.modifiedEmail} profileImage={el.profileImage} />;
          })
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
  };
};

export default connect(mapStateToProps)(DiscoverChat);