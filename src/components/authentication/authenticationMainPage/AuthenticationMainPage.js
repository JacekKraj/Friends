import React from "react";
import { connect } from "react-redux";

import classes from "./authenticationMainPage.module.scss";
import friendsGraphics from "./../../../assets/images/friendsGraphics.png";
import Logo from "./../../UI/logo/Logo";
import Button from "./../../UI/button/Button";
import SignUpModal from "./signUpModal/SignUpModal";
import SignInModal from "./signInModal/SignInModal";
import Backdrop from "./../../UI/backdrop/Backdrop";
import { failToast } from "./../../../utilities/toasts/toasts";
import * as actions from "./../../../actions/index";
import { verifyUserAge } from "./../../../utilities/helperFunctions/verifyUserAge";

const AuthenticationMainPage = (props) => {
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const [showSignInModal, setShowSignInModal] = React.useState(false);

  const hideModalHandler = () => {
    setShowSignUpModal(false);
    setShowSignInModal(false);
  };

  const handleSubmitRegister = (values) => {
    if (values.password.length >= 6) {
      if (values.email === values.emailRepeat) {
        if (values.password === values.passwordRepeat) {
          if (values.day && values.month && values.year) {
            const userAgeVerified = verifyUserAge(values.day, values.month, values.year);
            if (userAgeVerified) {
              if (values.name && values.surname) {
                props.onRegister(values.email.trim(), values.password.trim(), hideModalHandler, values.name.trim(), values.surname.trim(), {
                  day: values.day,
                  month: values.month,
                  year: values.year,
                });
              } else {
                failToast("You haven't passed name or surname.");
              }
            } else {
              failToast("You need to be older than 18 to start using Friends  :(");
            }
          } else {
            failToast("You haven't selected full birthday date.");
          }
        } else {
          failToast("You have passed two different passwords.");
        }
      } else {
        failToast("You have passed two different email addresses.");
      }
    } else {
      failToast("Password must have at least 6 characters.");
    }
  };

  const handleSubmitAuthenticate = (values) => {
    if (values.email && values.password) {
      props.onAuthenticate(values.email.trim(), values.password.trim());
    }
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
        <SignUpModal show={showSignUpModal} hideModalHandler={hideModalHandler} handleSubmit={handleSubmitRegister} />
        <SignInModal show={showSignInModal} hideModalHandler={hideModalHandler} handleSubmit={handleSubmitAuthenticate} />
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (email, password, hideModalHandler, name, surname, birthdayDate) =>
      dispatch(actions.register(email, password, hideModalHandler, name, surname, birthdayDate)),
    onAuthenticate: (email, password) => dispatch(actions.authenticate(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(AuthenticationMainPage);
