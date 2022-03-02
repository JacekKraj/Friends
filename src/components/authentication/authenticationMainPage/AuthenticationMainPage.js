import React from 'react';

import { useActions } from '../../../utilities/hooks/useActions';
import classes from './authenticationMainPage.module.scss';
import friendsGraphics from './../../../assets/images/friends.png';
import Logo from './../../UI/logo/Logo';
import Button from './../../UI/button/Button';
import { MODAL_TYPES } from './../../../modalMenager/ModalMenager';
import { failToast } from './../../../utilities/toasts/toasts';
import { verifyUserAge } from './../../../utilities/helperFunctions/verifyUserAge';

const AuthenticationMainPage = () => {
  const { register, authenticate, showModal } = useActions();

  const handleSubmitRegister = (values) => {
    if (values.password.length < 6) {
      failToast('Password must have at least 6 characters.');
      return;
    }
    if (values.email !== values.emailRepeat) {
      failToast('You have passed two different email addresses.');
      return;
    }
    if (values.password !== values.passwordRepeat) {
      failToast('You have passed two different passwords.');
      return;
    }
    if (!values.day || !values.month || !values.year) {
      failToast("You haven't selected full birthday date.");
      return;
    }

    const birthdayDate = { day: values.day, month: values.month, year: values.year };
    const userAgeVerified = verifyUserAge(birthdayDate);

    if (!userAgeVerified) {
      failToast('You need to be older than 18 to start using Friends  :(');
      return;
    }
    if (!values.name || !values.surname) {
      failToast("You haven't passed name or surname.");
      return;
    }

    const createdUserData = {
      email: values.email.trim(),
      password: values.password.trim(),
      name: values.name.trim(),
      surname: values.surname.trim(),
      birthdayDate: {
        day: values.day,
        month: values.month,
        year: values.year,
      },
    };

    register(createdUserData);
  };

  const handleSubmitAuthenticate = (values) => {
    if (values.email && values.password) {
      authenticate(values.email.trim(), values.password.trim());
    }
  };

  const showSignUpModal = () => {
    showModal(MODAL_TYPES.SIGN_UP, { submit: handleSubmitRegister });
  };

  const showSignInModal = () => {
    showModal(MODAL_TYPES.SIGN_IN, { submit: handleSubmitAuthenticate });
  };

  return (
    <div className={classes.authenticationMainPagecomponent}>
      <div className={classes.infoContainer}>
        <div className={classes.logoContainer}>
          <Logo className={classes.logo} />
        </div>
        <div className={classes.hedalinesContainer}>
          <h1>Meet your friends</h1>
          <h4>Join us now.</h4>
        </div>
        <div className={classes.buttonsContainer}>
          <Button className={classes.button} onClick={showSignUpModal} testData='sign-up-button'>
            Sign up
          </Button>
          <Button isTransparent className={classes.button} onClick={showSignInModal} testData='sign-in-button'>
            Sign in
          </Button>
        </div>
      </div>
      <div className={classes.graphicsContainer}>
        <img src={friendsGraphics} alt='graphic of friends' />
      </div>
    </div>
  );
};

export default AuthenticationMainPage;
