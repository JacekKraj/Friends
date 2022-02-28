import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';
import CloseIcon from '@material-ui/icons/Close';
import classes from './smallScreenDiscoverBar.module.scss';
import Backdrop from './../../../UI/backdrop/Backdrop';
import * as actions from './../../../../actions/index';
import SearchInput from './../../searchInput/SearchInput';

const { mobileVertical, tabletVertical, mobileHorizontal } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    width: 40,
    height: 40,
    marginLeft: -5,
    marginRight: 5,
    [mobileVertical]: {
      width: 42,
      height: 42,
    },
    [tabletVertical]: {
      width: 55,
      height: 55,
      marginLeft: -10,
      marginRight: 10,
    },
    [mobileHorizontal]: {
      width: 38,
      height: 38,
      marginLeft: -10,
    },
  },
}));

const SmallScreenDiscoverBar = ({ showDiscoverBar, onSetShowDiscoverBar, children }) => {
  const iconStyle = useStyles();

  return showDiscoverBar ? (
    <div data-test='small-screen-discover-bar-component'>
      <Backdrop onClick={() => onSetShowDiscoverBar(false)} />
      <div className={classes.discoverBarComponent}>
        <div className={classes.header}>
          <CloseIcon onClick={() => onSetShowDiscoverBar(false)} className={iconStyle.icon} />
          <SearchInput />
        </div>
        <div className={classes.discoverBarContent}>{children}</div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    showDiscoverBar: state.nav.isShownDiscoverBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetShowDiscoverBar: (show) => dispatch(actions.setShowDiscoverBar(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallScreenDiscoverBar);
