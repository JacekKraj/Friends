import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { useActions } from '../../../../utilities/hooks/useActions';
import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';
import CloseIcon from '@material-ui/icons/Close';
import classes from './smallScreenDiscoverBar.module.scss';
import Backdrop from './../../../UI/backdrop/Backdrop';
import SearchInput from './../../searchInput/SearchInput';

const { mobileVertical, tabletVertical, mobileHorizontal } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    width: 40,
    height: 40,
    marginLeft: -5,
    marginRight: 5,
    cursor: 'pointer',
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

const SmallScreenDiscoverBar = ({ children }) => {
  const { isShownDiscoverBar } = useSelector((state) => state.nav);
  const { setShowDiscoverBar } = useActions();

  const iconStyle = useStyles();

  return isShownDiscoverBar ? (
    <div data-test='small-screen-discover-bar-component'>
      <Backdrop onClick={() => setShowDiscoverBar(false)} />
      <div className={classes.discoverBarComponent}>
        <div className={classes.header}>
          <CloseIcon onClick={() => setShowDiscoverBar(false)} className={iconStyle.icon} />
          <SearchInput />
        </div>
        <div className={classes.discoverBarContent}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default SmallScreenDiscoverBar;
