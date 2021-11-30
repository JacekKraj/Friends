import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';

import classes from './user.module.scss';
import { theme } from './../../../../utilities/breakpoints/breakpoints';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#f59c03',
    position: 'absolute',
    zIndex: 1,
    [theme.breakpoints.up('0')]: {
      width: 17,
      height: 17,
      bottom: -5,
      right: -5,
    },

    [`${theme.breakpoints.up('768')} and (orientation:portrait)`]: {
      width: 21,
      height: 21,
    },
  },
}));

const User = (props) => {
  const { currChat, navigateTo, user, isNotification, dataTest } = props;

  const iconStyle = useStyles();

  return (
    <NavLink to={navigateTo} className={classnames(classes.userComponent, currChat && classes.currChat)} data-test={dataTest}>
      <div className={classes.imageContainer}>
        <img className={classes.image} src={user.profileImage} />
        {isNotification && <EmailIcon className={iconStyle.icon} />}
      </div>
      <p className={classes.name}>{user.name}</p>
    </NavLink>
  );
};

export default User;
