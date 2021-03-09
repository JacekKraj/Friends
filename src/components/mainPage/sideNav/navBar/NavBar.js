import React from "react";
import { connect } from "react-redux";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FlagIcon from "@material-ui/icons/Flag";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import classes from "./navBar.module.scss";
import defaultUserImage from "./../../../../assets/images/defaultUserImage.png";
import NavItem from "./navItem/NavItem";
import * as actions from "./../../../../actions/index";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 411,
      md: 600,
      mdlg: 800,
      lg: 1000,
      xl: 1150,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    color: "#ffa500",
    [theme.breakpoints.up("xs")]: {
      width: 30,
      height: 30,
    },
    [theme.breakpoints.up("sm")]: {
      width: 33,
      height: 33,
    },

    [theme.breakpoints.up("md")]: {
      width: 50,
      height: 50,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 31,
      height: 31,
    },

    [`${theme.breakpoints.up("mdlg")} and (orientation:landscape)`]: {
      width: 35,
      height: 35,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 39,
      height: 39,
    },

    [`${theme.breakpoints.up("xl")} and (orientation:landscape)`]: {
      width: 42,
      height: 42,
    },
  },
}));

const NavBar = (props) => {
  const iconStyle = useStyles();
  return (
    <div className={classes.navBarComponent}>
      <div className={classes.user}>
        <div className={classes.profileImageContainer}>
          <img className={classes.profileImage} src={props.userImage ? props.userImage : defaultUserImage} alt="User profile image" />
        </div>
        <p className={classes.userName}>{props.userName}</p>
      </div>

      <NavItem link={`/${props.userName}`} icon={<PersonIcon className={iconStyle.icon} />} description="Profile" />
      <NavItem link="/friends" icon={<EmojiPeopleRoundedIcon className={iconStyle.icon} />} description="Friends" />
      <NavItem link="/groups" icon={<PeopleIcon className={iconStyle.icon} />} description="Groups" />
      <NavItem link="/pages" icon={<FlagIcon className={iconStyle.icon} />} description="Pages" />
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
    userImage: state.userData.profileImage,
    userName: state.userData.name,
    userModifiedEmail: state.userData.modifiedEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
