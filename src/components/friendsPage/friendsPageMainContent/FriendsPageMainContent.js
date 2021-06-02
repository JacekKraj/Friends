import React from "react";
import { connect } from "react-redux";

import classes from "./friendsPageMainContent.module.scss";
import DiscoverUsers from "./discoverUsers/DiscoverUsers";
import Header from "./../../pagesComponents/header/Header";

const FriendsPageMainContent = (props) => {
  return (
    <div className={classes.friendsPageMainContentComponent}>
      <Header sectionName="Friends" searchIconHidden={classes.searchIconHidden} />
      <div className={classes.mainContent}>
        <DiscoverUsers header="Your friends" users={props.followedUsers} toFollow={false} />
        <DiscoverUsers header="Discover other users" users={props.unfollowedUsers} toFollow={true} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followedUsers: state.userData.followedUsers,
    unfollowedUsers: state.userData.unfollowedUsers,
  };
};

export default connect(mapStateToProps)(FriendsPageMainContent);
