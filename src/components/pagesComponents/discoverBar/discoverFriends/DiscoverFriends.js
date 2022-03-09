import React from 'react';
import { useSelector } from 'react-redux';

import classes from './discoverFriends.module.scss';
import Friend from './friend/Friend';
import SectionTitle from './../sectionTitile/SectionTitle';
import NoUsersInfo from './../noUsersInfo/NoUsersInfo';

const DiscoverFriends = ({ location, users }) => {
  const { followedUsers } = useSelector((state) => state.userData);

  const isHome = location === 'home';

  return (
    <div className={classes.discoverFriendsComponent}>
      <SectionTitle title={isHome ? 'Discover others' : 'Followed users'} />
      {users.length ? (
        users.map((user) => {
          const isFollowedByCurrentUser = JSON.stringify(followedUsers).includes(JSON.stringify(user));
          return <Friend user={user} isFollowedByCurrentUser={isFollowedByCurrentUser} isHome={isHome} key={user.modifiedEmail} />;
        })
      ) : (
        <NoUsersInfo>{isHome ? 'There are no more people to follow right now.' : "This user hasn't followed anyone yet."}</NoUsersInfo>
      )}
    </div>
  );
};

export default DiscoverFriends;
