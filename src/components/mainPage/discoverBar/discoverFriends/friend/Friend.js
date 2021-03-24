import React from "react";
import { NavLink } from "react-router-dom";

import defaultUserImage from "./../../../../../assets/images/defaultUserImage.png";
import classes from "./friend.module.scss";
import Button from "./../../../../UI/button/Button";

const Friend = (props) => {
  return (
    <div className={classes.friendComponent}>
      <NavLink to={`/${props.modifiedEmail}`} className={classes.user}>
        <img src={props.profileImage ? props.profileImage : defaultUserImage} className={classes.profileImage} alt="user profile image" />
        <p>{props.name}</p>
      </NavLink>
      <Button className={classes.button} transparent={props.type === "unfollowed" ? true : false}>
        {props.type === "unfollowed" ? "follow" : "unfollow"}
      </Button>
    </div>
  );
};

export default Friend;
