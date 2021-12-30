import React from 'react';
import { connect } from 'react-redux';

import classes from './discoverFriends.module.scss';
import Friend from './friend/Friend';
import SectionTitle from './../sectionTitile/SectionTitle';
import NoUsersInfo from './../noUsersInfo/NoUsersInfo';

const DiscoverFriends = (props) => {
  const { location, users, followedUsers } = props;

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

const mapStateToProps = (state) => {
  return {
    followedUsers: state.userData.followedUsers,
  };
};

export default connect(mapStateToProps)(DiscoverFriends);
