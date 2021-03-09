import React from "react";
import classnames from "classnames";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import classes from "./smallScreenNav.module.scss";
import Backdrop from "../../../UI/backdrop/Backdrop";
import NavBar from "../navBar/NavBar";
import Logo from "../../../UI/logo/Logo";

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

  const content = props.show ? (
    <div data-test="small-screen-nav-bar-component">
      <Backdrop onClick={() => props.setShow(false)} />
      <div className={classes.smallScreenNavComponent}>
        <div className={classes.logoContainer}>
          <Logo className={classes.logo} />
          <CloseIcon className={iconStyle.icon} onClick={() => props.setShow(false)} />
        </div>
        <NavBar />
      </div>
    </div>
  ) : null;

  return content;
};

export default SmallScreenNavBar;
