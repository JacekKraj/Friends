import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

import CloseIcon from "@material-ui/icons/Close";
import classes from "./smallScreenDiscoverBar.module.scss";
import Backdrop from "./../../../UI/backdrop/Backdrop";
import * as actions from "./../../../../actions/index";
import SearchInput from "./../../searchInput/SearchInput";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 411,
      md: 600,
      lg: 800,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    color: "#ffa500",
    [theme.breakpoints.up("xs")]: {
      width: 40,
      height: 40,
      marginLeft: -5,
      marginRight: 5,
    },
    [theme.breakpoints.up("sm")]: {
      width: 42,
      height: 42,
    },

    [theme.breakpoints.up("md")]: {
      width: 65,
      height: 65,
      marginLeft: -10,
      marginRight: 10,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 38,
      height: 38,
      marginLeft: -10,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 42,
      height: 42,
    },
  },
}));

const SmallScreenDiscoverBar = (props) => {
  const iconStyle = useStyles();
  const content = props.showDiscoverBar ? (
    <div data-test="small-screen-discover-bar-component">
      <Backdrop onClick={() => props.onSetShowDiscoverBar(false)} />
      <div className={classes.discoverBarComponent}>
        <div className={classes.header}>
          <CloseIcon onClick={() => props.onSetShowDiscoverBar(false)} className={iconStyle.icon} />
          <SearchInput />
        </div>
        <div className={classes.discoverBarContent}>{props.children}</div>
      </div>
    </div>
  ) : null;
  return content;
};

const mapStateToProps = (state) => {
  return {
    showDiscoverBar: state.nav.showDiscoverBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetShowDiscoverBar: (show) => dispatch(actions.setShowDiscoverBar(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallScreenDiscoverBar);