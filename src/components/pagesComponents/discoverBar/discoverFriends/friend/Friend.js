import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import * as actions from './../../../../../actions/index';
import classes from './friend.module.scss';
import Button from './../../../../UI/button/Button';
import User from './../../user/User';

const Friend = (props) => {
  const { isHome, onFollowUser, onUnfollowUser, currentUserModifiedEmail, currentUserFollowedUsersEmails, isFollowedByCurrentUser, user } = props;

  const [extraClass, setExtraClass] = React.useState('');

  const handleButtonClick = () => {
    isHome && setExtraClass(classes.hiddenUser);
    const clickFunction = !isFollowedByCurrentUser ? onFollowUser : onUnfollowUser;
    clickFunction(user.modifiedEmail, currentUserModifiedEmail, currentUserFollowedUsersEmails);
  };

  return (
    <div
      className={classnames(classes.friendComponent, extraClass)}
      data-test={`component-friend-${isFollowedByCurrentUser ? 'followed' : 'unfollowed'}`}
    >
      <User navigateTo={`/users?user=${user.modifiedEmail}`} user={user} />
      {currentUserModifiedEmail !== user.modifiedEmail && (
        <Button className={classes.button} isTransparent={!isFollowedByCurrentUser} onClick={handleButtonClick}>
          {isFollowedByCurrentUser ? 'unfollow' : 'follow'}
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserModifiedEmail: state.userData.currentUser.modifiedEmail,
    currentUserFollowedUsersEmails: state.userData.currentUser.followedUsersEmails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowUser: (userToFollow, currentUser, followedUsersEmails) => dispatch(actions.followUser(userToFollow, currentUser, followedUsersEmails)),
    onUnfollowUser: (userToUnfollow, currentUser, followedUsersEmails) =>
      dispatch(actions.unfollowUser(userToUnfollow, currentUser, followedUsersEmails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
