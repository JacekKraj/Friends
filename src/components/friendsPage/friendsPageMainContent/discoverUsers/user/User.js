import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './../../../../../actions/index';
import classes from './user.module.scss';
import Button from './../../../../UI/button/Button';

export const User = (props) => {
  const { isToFollow, onFollowUser, onUnfollowUser, user } = props;

  const handleClick = () => {
    const onClickFunction = isToFollow ? onFollowUser : onUnfollowUser;
    onClickFunction(user.modifiedEmail);
  };

  return (
    <div className={classes.userComponent} data-test={`component-${isToFollow ? 'unfollowed' : 'followed'}-user`}>
      <NavLink to={`/users?user=${user.modifiedEmail}`} exact>
        <div className={classes.profileImage} style={{ backgroundImage: `url("${user.profileImage}")` }} />
        <p className={classes.name}>{user.name}</p>
      </NavLink>
      <Button className={classes.button} isTransparent={isToFollow} onClick={handleClick} data-test='follow-button'>
        {isToFollow ? 'follow' : 'unfollow'}
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowUser: (userToFollow) => dispatch(actions.followUser(userToFollow)),
    onUnfollowUser: (userToUnfollow) => dispatch(actions.unfollowUser(userToUnfollow)),
  };
};

const mapStateToProps = (state) => {
  return {
    followedUsersEmails: state.userData.currentUser.followedUsersEmails,
    currentUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
