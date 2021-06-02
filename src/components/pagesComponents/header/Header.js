import React from "react";
import { connect } from "react-redux";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

import classes from "./header.module.scss";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import * as actions from "./../../../actions/index";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      400: 400,
      700: 700,
      768: 768,
      1000: 1000,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    color: "#ffa500",
    [theme.breakpoints.up("0")]: {
      width: 34,
      height: 34,
    },
    [theme.breakpoints.up("400")]: {
      width: 40,
      height: 40,
    },

    [theme.breakpoints.up("768")]: {
      width: 60,
      height: 60,
    },

    [`${theme.breakpoints.up("700")} and (orientation:landscape)`]: {
      width: 36,
      height: 36,
    },

    [`${theme.breakpoints.up("1000")} and (orientation:landscape)`]: {
      display: "none",
    },
  },
}));

const Header = (props) => {
  const iconStyle = useStyles();
  return (
    <div className={classes.headerComponent}>
      <div className={classes.headerLeftSide}>
        <div
          className={props.menuIcon}
          onClick={() => {
            props.onSetShowNav(true);
          }}
        >
          <MenuIcon className={iconStyle.icon} />
        </div>
        <p className={classes.sectionName}>{props.sectionName}</p>
      </div>
      <div
        className={classnames(classes.searchIcon, props.searchIconHidden)}
        onClick={() => {
          props.onSetShowDiscoverBar(true);
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
