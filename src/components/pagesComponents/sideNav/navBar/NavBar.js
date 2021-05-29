import React from "react";
import { connect } from "react-redux";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import classes from "./navBar.module.scss";
import NavItem from "./navItem/NavItem";
import * as actions from "./../../../../actions/index";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      0: 0,
      400: 400,
      600: 600,
      768: 768,
      800: 800,
      1000: 1000,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    color: "#ffa500",
    [theme.breakpoints.up("0")]: {
      width: 30,
      height: 30,
    },
    [theme.breakpoints.up("400")]: {
      width: 33,
      height: 33,
    },

    [theme.breakpoints.up("768")]: {
      width: 50,
      height: 50,
    },

    [`${theme.breakpoints.up("600")} and (orientation:landscape)`]: {
      width: 33,
      height: 33,
    },

    [`${theme.breakpoints.up("1000")} and (orientation:landscape)`]: {
      width: 39,
      height: 39,
    },
  },
}));

const NavBar = (props) => {
  const iconStyle = useStyles();
  return (
    <div className={classes.navBarComponent}>
      <div className={classes.user}>
        <div className={classes.profileImageContainer}>
          <img className={classes.profileImage} src={props.currUserProfileImage} alt="User profile image" />
        </div>
        <p className={classes.userName}>{props.currUserName}</p>
      </div>

      <NavItem link={`/users?user=${props.currUserModifiedEmail}`} icon={<PersonIcon className={iconStyle.icon} />} description="Profile" />
      <NavItem link="/friends" icon={<EmojiPeopleRoundedIcon className={iconStyle.icon} />} description="Friends" />
      <NavItem link="/chat" icon={<ChatIcon className={iconStyle.icon} />} description="Chat" />
      <NavItem
        link="/"
        onClick={props.onLogout}
        icon={<ExitToAppIcon className={classnames(iconStyle.icon, classes.signoutIcon)} />}
        description="Sign out"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currUserProfileImage: state.userData.currentUser.profileImage,
    currUserName: state.userData.currentUser.name,
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
