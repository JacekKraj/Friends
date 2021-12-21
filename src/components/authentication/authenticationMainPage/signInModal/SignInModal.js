import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import classnames from 'classnames';

import classes from './../signUpModal/signUpModal.module.scss';
import Button from './../../../UI/button/Button';
import Logo from './../../../UI/logo/Logo';
import MyFormikInput from './../../../../utilities/myFormikInput/MyFormikInput';
import Input from './../../../UI/input/Input';
import Spinner from './../../../UI/spinner/Spinner';

const SignInModal = ({ handleFormSubmit, isShown, isLoading }) => {
  const signInForm = (
    <React.Fragment>
      <div className={classes.logoContainer}>
        <Logo />
      </div>
      <h3 className={classes.title}>Log in to Friends</h3>
      <div className={classes.formContainer} data-test={isShown && 'component-sign-in-modal'}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            handleFormSubmit({ ...values });
          }}
        >
          {() => {
            return (
              <Form>
                <div className={classes.inputsContainer}>
                  <MyFormikInput as={Input} required name='email' type='email' placeholder='Email address' className={classes.input} />
                  <MyFormikInput as={Input} required name='password' type='password' placeholder='Password' className={classes.input} />
                </div>
                <Button className={classes.button} isTransparent>
                  Sign in
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );

  return <div className={classnames(classes.modal, isShown && classes.modalVisible)}>{isLoading ? <Spinner /> : signInForm}</div>;
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps)(SignInModal);
