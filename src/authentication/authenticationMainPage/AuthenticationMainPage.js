import React from "react";

import classes from "./authenticationMainPage.module.scss";
import friendsGraphics from "./../../assets/images/friendsGraphics.png";
import Logo from "./../../UI/logo/Logo";
import Button from "./../../UI/button/Button";

const AuthenticationMainPage = () => {
  return (
    <div className={classes.component}>
      <div className={classes.infoContainer}>
        <div className={classes.logoContainer}>
          <Logo className={classes.logo} />
        </div>
        <div className={classes.hedalinesContainer}>
          <h1>Meet your friends</h1>
          <h4>Join us now.</h4>
        </div>
        <div className={classes.buttonsContainer}>
          <Button className={classes.button}>Sign up</Button>
          <Button transparent={true} className={classes.button}>
            Sign in
          </Button>
        </div>
      </div>
      <div className={classes.graphicsContainer}>
        <img src={friendsGraphics} alt="graphic of friends" />
      </div>
    </div>
  );
};

export default AuthenticationMainPage;
