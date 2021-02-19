import React from "react";

import classes from "./authenticationMainPage.module.scss";
import friendsGraphics from "./../../../assets/images/friendsGraphics.png";
import Logo from "./../../UI/logo/Logo";
import Button from "./../../UI/button/Button";
import SignUpModal from "./signUpModal/SignUpModal";
import SignInModal from "./signInModal/SignInModal";
import Backdrop from "./../../UI/backdrop/Backdrop";

const AuthenticationMainPage = () => {
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const [showSignInModal, setShowSignInModal] = React.useState(false);

  const hideModalHandler = () => {
    setShowSignUpModal(false);
    setShowSignInModal(false);
  };

  return (
    <React.Fragment>
      {(showSignInModal || showSignUpModal) && <Backdrop onClick={hideModalHandler} />}
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
            <Button className={classes.button} onClick={() => setShowSignUpModal(true)} testData="sign-up-button">
              Sign up
            </Button>
            <Button transparent={true} className={classes.button} onClick={() => setShowSignInModal(true)} testData="sign-in-button">
              Sign in
            </Button>
          </div>
        </div>
        <div className={classes.graphicsContainer}>
          <img src={friendsGraphics} alt="graphic of friends" />
        </div>
        <SignUpModal show={showSignUpModal} />
        <SignInModal show={showSignInModal} />
      </div>
    </React.Fragment>
  );
};

export default AuthenticationMainPage;
