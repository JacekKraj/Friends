import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import EmojiPeopleRoundedIcon from '@material-ui/icons/EmojiPeopleRounded';
import classes from './navBar.module.scss';
import NavItem from './navItem/NavItem';
import * as actions from './../../../../actions/index';
import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';

const { mobileVertical, tabletVertical, mobileHorizontal, laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    width: 30,
    height: 30,
    [mobileVertical]: {
      width: 33,
      height: 33,
    },
    [tabletVertical]: {
      width: 50,
      height: 50,
    },
    [mobileHorizontal]: {
      width: 33,
      height: 33,
    },
    [laptopSm]: {
      width: 39,
      height: 39,
    },
  },
}));

const NavBar = ({ currentUser, lastChat, onLogout }) => {
  const { profileImage, name, modifiedEmail } = currentUser;

  const iconStyle = useStyles();

  return (
    <div className={classes.navBarComponent}>
      <div className={classes.user}>
        <div className={classes.profileImageContainer}>
          <img className={classes.profileImage} src={profileImage} alt='User profile image' />
        </div>
        <p className={classes.userName}>{name}</p>
      </div>

      <NavItem navigateTo={`/users?user=${modifiedEmail}`} icon={<PersonIcon className={iconStyle.icon} />} label='Profile' />
      <NavItem navigateTo='/friends' icon={<EmojiPeopleRoundedIcon className={iconStyle.icon} />} label='Friends' />
      <NavItem navigateTo={`/chat?to=${lastChat || 'new'}`} icon={<ChatIcon className={iconStyle.icon} />} label='Chat' />
      <NavItem
        navigateTo='/'
        onClick={onLogout}
        icon={<ExitToAppIcon className={classnames(iconStyle.icon, classes.signoutIcon)} />}
        label='Sign out'
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.userData.currentUser,
    lastChat: state.chat.lastChat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
