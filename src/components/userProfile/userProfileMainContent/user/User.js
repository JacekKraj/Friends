import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

import WorkIcon from "@material-ui/icons/Work";
import WcIcon from "@material-ui/icons/Wc";
import HouseIcon from "@material-ui/icons/House";
import CakeIcon from "@material-ui/icons/Cake";
import classes from "./user.module.scss";
import defaultUserImage from "./../../../../assets/images/defaultUserImage.png";
import Button from "../../../UI/button/Button";
import UserInfo from "./userInfo/UserInfo";
import Spinner from "./../../../UI/spinner/Spinner";
import * as actions from "./../../../../actions/index";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 411,
      md: 550,
      mdlg: 800,
      lg: 1000,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    color: "#ffa500",
    [theme.breakpoints.up("xs")]: {
      width: 23,
      height: 23,
    },
    [theme.breakpoints.up("sm")]: {
      width: 26,
      height: 26,
    },

    [theme.breakpoints.up("md")]: {
      width: 37,
      height: 37,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 25,
      height: 25,
    },

    [`${theme.breakpoints.up("mdlg")} and (orientation:landscape)`]: {
      width: 30,
      height: 30,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 28,
      height: 28,
    },
  },
}));

const User = (props) => {
  const style = useStyles();

  const displayButton = React.useMemo(() => {
    let button = {};
    let handleClick;
    switch (props.userData.type) {
      case "current":
        button = { transparent: true, text: "Update profile" };
        break;
      case "followed":
        handleClick = () => {
          props.onUnfollowUser(props.userData.modifiedEmail, props.currentUserEmail, props.followedUsersEmails);
        };
        button = { transparent: false, text: "Unfollow", handleClick };
        break;
      default:
        handleClick = () => {
          props.onFollowUser(props.userData.modifiedEmail, props.currentUserEmail, props.followedUsersEmails);
        };
        button = { transparent: true, text: "Follow", handleClick };
        break;
    }
    return (
      <Button className={classes.button} data-test="profile-button" onClick={button.handleClick} transparent={button.transparent}>
        {button.text}
      </Button>
    );
  }, [props.userData.type]);

  const content = Object.keys(props.userData).length ? (
    <React.Fragment>
      <div className={classes.infoTop}>
        <img src={props.userData.profileImage || defaultUserImage} alt="user profile image" className={classes.image} />
        {displayButton}
      </div>
      <div className={classes.infoBottom}>
        <p className={classes.name}>{props.userData.name}</p>
        {props.userData.profileDescription && (
          <p data-test="profile-description" className={classes.description}>
            {props.userData.profileDescription}
          </p>
        )}
        <div className={classes.moreInfoContainer}>
          <UserInfo
            icon={<CakeIcon className={style.icon} />}
            text={`${props.userData.birthdayDate.day} ${props.userData.birthdayDate.month} ${props.userData.birthdayDate.year}`}
          />
          {props.userData.gender && <UserInfo icon={<WcIcon className={style.icon} />} text={props.userData.gender} />}
          {props.userData.home && <UserInfo icon={<HouseIcon className={style.icon} />} text={props.userData.home} />}
          {props.userData.job && <UserInfo icon={<WorkIcon className={style.icon} />} text={props.userData.job} />}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Spinner />
  );

  return <div className={classes.userInfoComponent}>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    followedUsersEmails: state.userData.currentUser.followedUsersEmails,
    currentUserEmail: state.userData.currentUser.modifiedEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowUser: (userToFollow, currentUser, followedUsersEmails) => dispatch(actions.followUser(userToFollow, currentUser, followedUsersEmails)),
    onUnfollowUser: (userToUnfollow, currentUser, followedUsersEmails) =>
      dispatch(actions.unfollowUser(userToUnfollow, currentUser, followedUsersEmails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
