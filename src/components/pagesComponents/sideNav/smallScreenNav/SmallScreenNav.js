import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import { theme } from './../../../../utilities/breakpoints/breakpoints';
import CloseIcon from '@material-ui/icons/Close';
import classes from './smallScreenNav.module.scss';
import Backdrop from '../../../UI/backdrop/Backdrop';
import NavBar from '../navBar/NavBar';
import Logo from '../../../UI/logo/Logo';
import * as actions from './../../../../actions/index';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    [theme.breakpoints.up('0')]: {
      width: 40,
      height: 40,
    },
    [theme.breakpoints.up('400')]: {
      width: 44,
      height: 44,
    },

    [theme.breakpoints.up('768')]: {
      width: 65,
      height: 65,
    },

    [`${theme.breakpoints.up('600')} and (orientation:landscape)`]: {
      width: 38,
      height: 38,
    },
  },
}));

const SmallScreenNavBar = ({ onSetShowNav, showNav }) => {
  const iconStyle = useStyles();

  const navBar = (
    <div data-test='small-screen-nav-bar-component'>
      <Backdrop onClick={() => onSetShowNav(false)} />
      <div className={classes.smallScreenNavComponent}>
        <div className={classes.logoContainer}>
          <NavLink to='/' exact>
            <Logo className={classes.logo} />
          </NavLink>
          <CloseIcon className={iconStyle.icon} onClick={() => onSetShowNav(false)} />
        </div>
        <NavBar />
      </div>
    </div>
  );

  return showNav ? navBar : null;
};

const mapStateToProps = (state) => {
  return {
    showNav: state.nav.showNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetShowNav: (show) => dispatch(actions.setShowNav(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallScreenNavBar);
