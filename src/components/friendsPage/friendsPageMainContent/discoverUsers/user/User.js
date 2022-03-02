import React from 'react';
import { NavLink } from 'react-router-dom';

import { useActions } from './../../../../../utilities/hooks/useActions';
import classes from './user.module.scss';
import Button from './../../../../UI/button/Button';

export const User = ({ isToFollow, user }) => {
  const { followUser, unfollowUser } = useActions();

  const handleClick = () => {
    const onClickFunction = isToFollow ? followUser : unfollowUser;
    onClickFunction(user.modifiedEmail);
  };

  return (
    <div className={classes.userComponent} data-test={`component-${isToFollow ? 'unfollowed' : 'followed'}-user`}>
      <NavLink to={`/users?user=${user.modifiedEmail}`} exact>
        <div className={classes.profileImage} style={{ backgroundImage: `url("${user.profileImage}")` }} />
        <p className={classes.name}>{user.name}</p>
      </NavLink>
      <Button className={classes.button} isTransparent={isToFollow} onClick={handleClick} testData='follow-button'>
        {isToFollow ? 'follow' : 'unfollow'}
      </Button>
    </div>
  );
};

export default User;
