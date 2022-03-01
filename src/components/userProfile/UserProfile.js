import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import UserProfileMainContent from './userProfileMainContent/UserProfileMainContent';
import SideNav from './../pagesComponents/sideNav/SideNav';
import DiscoverBar from './../pagesComponents/discoverBar/DiscoverBar';
import WholePageWrapper from '../wrappers/wholePageWrapper/WholePageWrapper';
import UserProfileDiscoverBar from './userProfileDiscoverBar/UserProfileDiscoverBar';

const UserProfile = (props) => {
  const { userData } = props;
  const { currentUser, unfollowedUsers, followedUsers } = userData;

  const [user, setUser] = React.useState({});
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  const location = useLocation();

  const TYPE_NO_USER_FOUND = 'no-user-found';

  const getUserEmialFromSearchParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const userEmail = searchParams.get('user');
    return userEmail;
  };

  const browseInOtherUsers = (users, userEmail) => {
    const user = users.find((user) => {
      return user.modifiedEmail === userEmail;
    });

    return user;
  };

  const isCurrentUser = (userEmail) => {
    return userEmail === currentUser.modifiedEmail;
  };

  const isUnfollowedUser = (userEmail) => {
    return !!browseInOtherUsers(unfollowedUsers, userEmail);
  };

  const isFollowedUser = (userEmail) => {
    return !!browseInOtherUsers(followedUsers, userEmail);
  };

  const getUser = (userEmail) => {
    if (!userEmail) {
      return { type: TYPE_NO_USER_FOUND };
    }

    let user, type;

    if (isCurrentUser(userEmail)) {
      user = { ...currentUser };
      type = 'current';
      return { ...user, type };
    }

    if (isUnfollowedUser(userEmail)) {
      user = { ...browseInOtherUsers(unfollowedUsers, userEmail) };
      type = 'unfollowed';
      return { ...user, type };
    }

    if (isFollowedUser(userEmail)) {
      user = { ...browseInOtherUsers(followedUsers, userEmail) };
      type = 'followed';
      return { ...user, type };
    }

    return { type: TYPE_NO_USER_FOUND };
  };

  React.useEffect(() => {
    if (!currentUser.modifiedEmail) return;

    const userEmail = getUserEmialFromSearchParams();
    const user = getUser(userEmail);

    if (user.type === TYPE_NO_USER_FOUND) {
      setShouldRedirect(true);
      return;
    }

    setUser(user);
  }, [location.search, currentUser.modifiedEmail]);

  return (
    <WholePageWrapper>
      {shouldRedirect && <Redirect to='usernotfound' />}
      <SideNav />
      <UserProfileMainContent user={user} />
      <DiscoverBar>
        <UserProfileDiscoverBar followedUsersEmails={user.followedUsersEmails} />
      </DiscoverBar>
    </WholePageWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

export default connect(mapStateToProps)(UserProfile);
