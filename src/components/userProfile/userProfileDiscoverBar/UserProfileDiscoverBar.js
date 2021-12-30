import React from 'react';
import { connect } from 'react-redux';

import { sortUsersAlphabetically } from './../../../utilities/helperFunctions/sortUsersAlphabetically';
import DiscoverFriends from './../../pagesComponents/discoverBar/discoverFriends/DiscoverFriends';

const UserProfileDiscoverBar = ({ userData, followedUsersEmails }) => {
  const [followedUsers, setFollowedUsers] = React.useState([]);

  const isFollowedUser = (user) => {
    return followedUsersEmails?.includes(user.modifiedEmail);
  };

  const getUsersToDisplay = () => {
    const users = [...userData.followedUsers, ...userData.unfollowedUsers, userData.currentUser].filter((user) => {
      return isFollowedUser(user);
    });

    return users;
  };

  React.useEffect(() => {
    const usersToDisplay = getUsersToDisplay();

    const sortedUsersToDisplay = sortUsersAlphabetically(usersToDisplay);

    setFollowedUsers(sortedUsersToDisplay);
  }, [JSON.stringify(followedUsersEmails)]);

  return <DiscoverFriends location='profile' users={followedUsers} />;
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps)(UserProfileDiscoverBar);
