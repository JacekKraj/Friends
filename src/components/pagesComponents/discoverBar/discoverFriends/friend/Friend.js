import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import * as actions from "./../../../../../actions/index";
import classes from "./friend.module.scss";
import Button from "./../../../../UI/button/Button";
import User from "./../../user/User";

const Friend = (props) => {
  const [extraClass, setExtraClass] = React.useState("");
  const handleButtonClick = () => {
    props.type === "home" && setExtraClass(classes.hiddenUser);
    !props.isFollowedByCurrentUser
      ? props.onFollowUser(props.modifiedEmail, props.currentUserModifiedEmail, props.currentUserFollowedUsersEmails)
      : props.onUnfollowUser(props.modifiedEmail, props.currentUserModifiedEmail, props.currentUserFollowedUsersEmails);
  };
  return (
    <div
      className={classnames(classes.friendComponent, extraClass)}
      data-test={`component-friend-${props.isFollowedByCurrentUser ? "followed" : "unfollowed"}`}
    >
      <User link={`/users?user=${props.modifiedEmail}`} profileImage={props.profileImage} name={props.name} />
      {props.currentUserModifiedEmail !== props.modifiedEmail && (
        <Button className={classes.button} transparent={!props.isFollowedByCurrentUser} onClick={handleButtonClick}>
          {props.isFollowedByCurrentUser ? "unfollow" : "follow"}
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
