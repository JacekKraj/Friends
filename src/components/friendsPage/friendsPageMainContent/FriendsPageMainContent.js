import React from 'react';
import { useSelector } from 'react-redux';

import classes from './friendsPageMainContent.module.scss';
import DiscoverUsers from './discoverUsers/DiscoverUsers';
import Header from './../../pagesComponents/header/Header';

const FriendsPageMainContent = () => {
  const { followedUsers, unfollowedUsers } = useSelector((state) => state.userData);

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

export default FriendsPageMainContent;
