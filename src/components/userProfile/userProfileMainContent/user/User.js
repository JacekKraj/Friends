import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import ChatIcon from "@material-ui/icons/Chat";
import WorkIcon from "@material-ui/icons/Work";
import WcIcon from "@material-ui/icons/Wc";
import HouseIcon from "@material-ui/icons/House";
import CakeIcon from "@material-ui/icons/Cake";
import classes from "./user.module.scss";
import Button from "../../../UI/button/Button";
import UserInfo from "./userInfo/UserInfo";
import Spinner from "./../../../UI/spinner/Spinner";
import UpdateProfileModal from "./updateProfileModal/UpadateProfileModal";
import * as actions from "./../../../../actions/index";
import { theme } from "./../../../../utilities/breakpoints/breakpoints";

const useStyles = makeStyles(() => ({
  icon: {
    color: "#ffa500",
    [theme.breakpoints.up("0")]: {
      width: 23,
      height: 23,
    },
    [theme.breakpoints.up("400")]: {
      width: 26,
      height: 26,
    },

    [theme.breakpoints.up("550")]: {
      width: 37,
      height: 37,
    },

    [`${theme.breakpoints.up("550")} and (orientation:landscape)`]: {
      width: 25,
      height: 25,
    },

    [`${theme.breakpoints.up("800")} and (orientation:landscape)`]: {
      width: 30,
      height: 30,
    },

    [`${theme.breakpoints.up("1000")} and (orientation:landscape)`]: {
      width: 28,
      height: 28,
    },
  },
  chatIcon: {
    color: "white",
    [theme.breakpoints.up("0")]: {
      width: 26,
      height: 26,
    },
    [`${theme.breakpoints.up("768")} and (orientation:portrait)`]: {
      width: 38,
      height: 38,
    },
  },
}));

const User = (props) => {
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const style = useStyles();

  const displayButton = React.useMemo(() => {
    let button = {};
    let handleClick;
    switch (props.userData.type) {
      case "current":
        handleClick = () => {
          setShowUpdateModal(true);
        };
        button = { transparent: true, text: "Update profile", handleClick };
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
      <Button className={classes.button} testData="profile-button" onClick={button.handleClick} transparent={button.transparent}>
        {button.text}
      </Button>
    );
  }, [props.userData.type]);

  const content = Object.keys(props.userData).length ? (
    <React.Fragment>
      {showUpdateModal && (
        <UpdateProfileModal
          handleHideModal={() => setShowUpdateModal(false)}
          modifiedEmail={props.userData.modifiedEmail}
          profileImage={props.userData.profileImage}
          personalInfo={props.userData.personalInfo}
        />
      )}
      <div className={classes.infoTop}>
        <img src={props.userData.profileImage} alt="user profile image" className={classes.image} />
        <div className={classes.buttonsContainer}>
          {displayButton}
          {props.userData.type === "followed" && (
            <NavLink className={classes.chatLink} to={`/chat?to=${props.userData.modifiedEmail}`}>
              <ChatIcon className={style.chatIcon} />
            </NavLink>
          )}
        </div>
      </div>
      <div className={classes.infoBottom}>
        <p className={classes.name}>{props.userData.name}</p>
        {props.userData.personalInfo?.profileDescription && (
          <p data-test="profile-description" className={classes.description}>
            {props.userData.personalInfo.profileDescription}
          </p>
        )}
        <div className={classes.moreInfoContainer}>
          <UserInfo
            icon={<CakeIcon className={style.icon} />}
            text={`${props.userData.birthdayDate.day} ${props.userData.birthdayDate.month} ${props.userData.birthdayDate.year}`}
          />
          {props.userData.personalInfo?.gender && <UserInfo icon={<WcIcon className={style.icon} />} text={props.userData.personalInfo.gender} />}
          {props.userData.personalInfo?.home && <UserInfo icon={<HouseIcon className={style.icon} />} text={props.userData.personalInfo.home} />}
          {props.userData.personalInfo?.work && <UserInfo icon={<WorkIcon className={style.icon} />} text={props.userData.personalInfo.work} />}
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
