import React from 'react';
import { useSelector } from 'react-redux';

import { useActions } from './../../../../../utilities/hooks/useActions';
import classes from './friend.module.scss';
import Button from './../../../../UI/button/Button';
import User from './../../user/User';

const Friend = ({ isHome, isFollowedByCurrentUser, user }) => {
  const { modifiedEmail } = useSelector((state) => state.userData.currentUser);
  const { followUser, unfollowUser } = useActions();

  const handleButtonClick = () => {
    const clickFunction = !isFollowedByCurrentUser ? followUser : unfollowUser;
    clickFunction(user.modifiedEmail);
  };

  return (
    <div className={classes.friendComponent} data-test={`component-friend-${isFollowedByCurrentUser ? 'followed' : 'unfollowed'}`}>
      <User navigateTo={`/users?user=${user.modifiedEmail}`} user={user} />
      {modifiedEmail !== user.modifiedEmail && (
        <Button className={classes.button} isTransparent={!isFollowedByCurrentUser} onClick={handleButtonClick}>
          {isFollowedByCurrentUser ? 'unfollow' : 'follow'}
        </Button>
      )}
    </div>
  );
};

export default Friend;
