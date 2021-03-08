import React from "react";
import classnames from "classnames";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import classes from "./smallScreenNavBar.module.scss";
import Backdrop from "./../../../UI/backdrop/Backdrop";
import NavBar from "./../NavBar";
import Logo from "./../../../UI/logo/Logo";

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
    },
    [theme.breakpoints.up("sm")]: {
      width: 44,
      height: 44,
    },

    [theme.breakpoints.up("md")]: {
      width: 65,
      height: 65,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 38,
      height: 38,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 42,
      height: 42,
    },
  },
}));

const SmallScreenNavBar = (props) => {
  const iconStyle = useStyles();
  return (
    <React.Fragment>
      {!props.show && <Backdrop />}
      <div className={classnames(classes.smallScreenNavBarComponent, props.show && classes.navBarShown)}>
        <div className={classes.logoContainer}>
          <Logo className={classes.logo} />
          <CloseIcon className={iconStyle.icon} />
        </div>
        <NavBar />
      </div>
    </React.Fragment>
  );
};

export default SmallScreenNavBar;
