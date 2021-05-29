import React from "react";
import { connect } from "react-redux";

import classes from "./userProfileDiscoverBar.module.scss";
import { sortUsersAlphabetically } from "./../../../utilities/helperFunctions/sortUsersAlphabetically";
import DiscoverFriends from "./../../pagesComponents/discoverBar/discoverFriends/DiscoverFriends";

const UserProfileDiscoverBar = (props) => {
  const [followedUsers, setFollowedUsers] = React.useState([]);

  React.useEffect(() => {
    let usersToDisplay = [...props.followedUsers, ...props.unfollowedUsers, props.currentUser].filter((el) => {
      return props.followed?.includes(el.modifiedEmail);
    });

    usersToDisplay = sortUsersAlphabetically(usersToDisplay);
    setFollowedUsers(usersToDisplay);
  }, [JSON.stringify(props.followed)]);

  return (
    <div>
      <DiscoverFriends type="profile" users={followedUsers} followedUsersEmails={props.followed} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followedUsers: state.userData.followedUsers,
    unfollowedUsers: state.userData.unfollowedUsers,
    currentUser: state.userData.currentUser,
  };
};

export default connect(mapStateToProps)(UserProfileDiscoverBar);
