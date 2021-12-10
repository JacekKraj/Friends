import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { breakpoints } from './../../../utilities/breakpoints/breakpoints';
import classes from './header.module.scss';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import * as actions from './../../../actions/index';

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

const Header = (props) => {
  const { menuIcon, onSetShowNav, sectionName, searchIconHiddenClass, onSetShowDiscoverBar } = props;

  const iconStyle = useStyles();

  return (
    <div className={classes.headerComponent}>
      <div className={classes.headerLeftSide}>
        <div
          className={menuIcon}
          onClick={() => {
            onSetShowNav(true);
          }}
        >
          <MenuIcon className={iconStyle.icon} />
        </div>
        <p className={classes.sectionName}>{sectionName}</p>
      </div>
      <div
        className={classnames(classes.searchIcon, searchIconHiddenClass)}
        onClick={() => {
          onSetShowDiscoverBar(true);
        }}
      >
        <SearchIcon className={iconStyle.icon} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetShowNav: (show) => dispatch(actions.setShowNav(show)),
    onSetShowDiscoverBar: (show) => dispatch(actions.setShowDiscoverBar(show)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
