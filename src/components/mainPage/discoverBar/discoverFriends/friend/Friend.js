import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import * as actions from "./../../../../../actions/index";
import defaultUserImage from "./../../../../../assets/images/defaultUserImage.png";
import classes from "./friend.module.scss";
import Button from "./../../../../UI/button/Button";

const Friend = (props) => {
  const [extraClass, setExtraClass] = React.useState("");
  const handleButtonClick = () => {
    setExtraClass(classes.hiddenUser);
    props.onFollowUser(props.modifiedEmail, props.currentUser, props.followedUsersEmails);
  };
  return (
    <div className={classnames(classes.friendComponent, extraClass)} data-test="friend-component">
      <NavLink to={`/${props.modifiedEmail}`} className={classes.user}>
        <img src={props.profileImage ? props.profileImage : defaultUserImage} className={classes.profileImage} alt="user profile image" />
        <p>{props.name}</p>
      </NavLink>
      <Button className={classes.button} transparent={true} onClick={handleButtonClick}>
        follow
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.userData.modifiedEmail,
    followedUsersEmails: state.userData.followedUsersEmails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowUser: (userToFollow, currentUser, followedUsersEmails) => dispatch(actions.followUser(userToFollow, currentUser, followedUsersEmails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
