import React from "react";
import { connect } from "react-redux";

import classes from "./discoverFriends.module.scss";
import Friend from "./friend/Friend";
import SectionTitle from "./../sectionTitile/SectionTitle";

const DiscoverFriends = (props) => {
  return (
    <div className={classes.discoverFriendsComponent}>
      <SectionTitle title={props.type === "home" ? "Discover others" : "Followed users"} />
      {props.unfollowedUsers.length ? (
        props.unfollowedUsers.map((el) => {
          return <Friend name={el.name} modifiedEmail={el.modifiedEmail} key={el.modifiedEmail} profileImage={null} />;
        })
      ) : (
        <p className={classes.info} data-test="no-users-info">
          There are no more people to follow right now.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    unfollowedUsers: state.userData.unfollowedUsers,
  };
};

export default connect(mapStateToProps)(DiscoverFriends);
