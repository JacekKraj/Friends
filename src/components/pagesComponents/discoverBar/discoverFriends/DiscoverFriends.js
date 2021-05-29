import React from "react";
import { connect } from "react-redux";

import classes from "./discoverFriends.module.scss";
import Friend from "./friend/Friend";
import SectionTitle from "./../sectionTitile/SectionTitle";
import NoUsersInfo from "./../noUsersInfo/NoUsersInfo";

const DiscoverFriends = (props) => {
  return (
    <div className={classes.discoverFriendsComponent}>
      <SectionTitle title={props.type === "home" ? "Discover others" : "Followed users"} />
      {props.users.length ? (
        props.users.map((el) => {
          const isFollowedByCurrentUser = JSON.stringify(props.followedUsers).includes(JSON.stringify(el));
          return (
            <Friend
              name={el.name}
              isFollowedByCurrentUser={isFollowedByCurrentUser}
              followedUsersEmails={props.followedUsersEmails}
              type={props.type}
              modifiedEmail={el.modifiedEmail}
              key={el.modifiedEmail}
              profileImage={el.profileImage}
            />
          );
        })
      ) : (
        <NoUsersInfo>{props.type === "home" ? "There are no more people to follow right now." : "This user hasn't followed anyone yet."}</NoUsersInfo>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followedUsers: state.userData.followedUsers,
  };
};

export default connect(mapStateToProps)(DiscoverFriends);
