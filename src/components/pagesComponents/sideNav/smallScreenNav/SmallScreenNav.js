import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useActions } from '../../../../utilities/hooks/useActions';
import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';
import CloseIcon from '@material-ui/icons/Close';
import classes from './smallScreenNav.module.scss';
import Backdrop from '../../../UI/backdrop/Backdrop';
import NavBar from '../navBar/NavBar';
import Logo from '../../../UI/logo/Logo';

const { mobileVertical, tabletVertical, mobileHoriozntal } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    width: 40,
    height: 40,
    cursor: 'pointer',
    [mobileVertical]: {
      width: 44,
      height: 44,
    },
    [tabletVertical]: {
      width: 65,
      height: 65,
    },
    [mobileHoriozntal]: {
      width: 38,
      height: 38,
    },
  },
}));

const SmallScreenNavBar = () => {
  const { isShownNav } = useSelector((state) => state.nav);
  const { setShowNav } = useActions();

  const iconStyle = useStyles();

  const navBar = (
    <div data-test='small-screen-nav-bar-component'>
      <Backdrop onClick={() => setShowNav(false)} />
      <div className={classes.smallScreenNavComponent}>
        <div className={classes.logoContainer}>
          <NavLink to='/' exact>
            <Logo className={classes.logo} />
          </NavLink>
          <CloseIcon className={iconStyle.icon} onClick={() => setShowNav(false)} />
        </div>
        <NavBar />
      </div>
    </div>
  );

  return isShownNav ? navBar : null;
};

export default SmallScreenNavBar;
