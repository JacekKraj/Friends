import React from 'react';
import { connect } from 'react-redux';

import classes from './friendsPageMainContent.module.scss';
import DiscoverUsers from './discoverUsers/DiscoverUsers';
import Header from './../../pagesComponents/header/Header';

const FriendsPageMainContent = ({ followedUsers, unfollowedUsers }) => {
  return (
    <div className={classes.friendsPageMainContentComponent}>
      <Header sectionName='Friends' searchIconHiddenClass={classes.searchIconHidden} />
      <div className={classes.mainContent}>
        <DiscoverUsers header='Discover other users' usersObjects={unfollowedUsers} areFollowedUsers={false} />
        <DiscoverUsers header='Your friends' usersObjects={followedUsers} areFollowedUsers={true} />
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
