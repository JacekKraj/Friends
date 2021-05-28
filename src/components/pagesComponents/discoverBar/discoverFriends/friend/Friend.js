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
    setExtraClass(classes.hiddenUser);
    props.onFollowUser(props.modifiedEmail, props.currentUserModifiedEmail, props.followedUsersEmails);
  };
  return (
    <div className={classnames(classes.friendComponent, extraClass)} data-test="friend-component">
      <User link={`/users?user=${props.modifiedEmail}`} profileImage={props.profileImage} name={props.name} />
      <Button className={classes.button} transparent={true} onClick={handleButtonClick}>
        follow
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserModifiedEmail: state.userData.currentUser.modifiedEmail,
    followedUsersEmails: state.userData.currentUser.followedUsersEmails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowUser: (userToFollow, currentUser, followedUsersEmails) => dispatch(actions.followUser(userToFollow, currentUser, followedUsersEmails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
