import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./../../../../../actions/index";
import classes from "./user.module.scss";
import Button from "./../../../../UI/button/Button";

export const User = (props) => {
  const handleClick = () => {
    const onClickFunction = props.toFollow ? props.onFollowUser : props.onUnfollowUser;
    onClickFunction(props.modifiedEmail, props.currentUserModifiedEmail, props.followedUsersEmails);
  };
  return (
    <div className={classes.userComponent} data-test={`component-${props.toFollow ? "unfollowed" : "followed"}-user`}>
      <NavLink to={`/users?user=${props.modifiedEmail}`} exact>
        <div className={classes.profileImage} style={{ backgroundImage: `url("${props.profileImage}")` }} />
        <p className={classes.name}>{props.name}</p>
      </NavLink>
      <Button className={classes.button} transparent={props.toFollow} onClick={handleClick} data-test="follow-button">
        {props.toFollow ? "follow" : "unfollow"}
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowUser: (userToFollow, currentUser, followedUsersEmails) => dispatch(actions.followUser(userToFollow, currentUser, followedUsersEmails)),
    onUnfollowUser: (userToUnfollow, currentUser, followedUsersEmails) =>
      dispatch(actions.unfollowUser(userToUnfollow, currentUser, followedUsersEmails)),
  };
};

const mapStateToProps = (state) => {
  return {
    followedUsersEmails: state.userData.currentUser.followedUsersEmails,
    currentUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
