import React from 'react';
import { Formik, Form } from 'formik';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import classes from './../signUpModal/signUpModal.module.scss';
import Button from './../../../UI/button/Button';
import Logo from './../../../UI/logo/Logo';
import MyFormikInput from './../../../../utilities/myFormikInput/MyFormikInput';
import Input from './../../../UI/input/Input';
import Spinner from './../../../UI/spinner/Spinner';

const SignInModal = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const { props } = useSelector((state) => state.modals);
  const { submit } = props;

  const signInForm = (
    <React.Fragment>
      <div className={classes.logoContainer}>
        <Logo />
      </div>
      <h3 className={classes.title}>Log in to Friends</h3>
      <div className={classes.formContainer} data-test={'component-sign-in-modal'}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            submit({ ...values });
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

  return <div className={classnames(classes.modal, classes.modalVisible)}>{isLoading ? <Spinner /> : signInForm}</div>;
};

export default SignInModal;
