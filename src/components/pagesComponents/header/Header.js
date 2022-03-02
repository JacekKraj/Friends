import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { useActions } from '../../../utilities/hooks/useActions';
import { breakpoints } from './../../../utilities/breakpoints/breakpoints';
import classes from './header.module.scss';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const { mobileVertical, tabletVertical, tabletHorizontal, laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    width: 34,
    height: 34,
    [mobileVertical]: {
      width: 40,
      height: 40,
    },
    [tabletVertical]: {
      width: 60,
      height: 60,
    },
    [tabletHorizontal]: {
      width: 36,
      height: 36,
    },
    [laptopSm]: {
      display: 'none',
    },
  },
}));

const Header = ({ menuIcon, sectionName, searchIconHiddenClass }) => {
  const { setShowNav, setShowDiscoverBar } = useActions();

  const iconStyle = useStyles();

  return (
    <div className={classes.headerComponent}>
      <div className={classes.headerLeftSide}>
        <div
          className={menuIcon}
          onClick={() => {
            setShowNav(true);
          }}
        >
          <MenuIcon className={iconStyle.icon} />
        </div>
        <p className={classes.sectionName}>{sectionName}</p>
      </div>
      <div
        className={classnames(classes.searchIcon, searchIconHiddenClass)}
        onClick={() => {
          setShowDiscoverBar(true);
        }}
      >
        <SearchIcon className={iconStyle.icon} />
      </div>
    </div>
  );
};

export default Header;
