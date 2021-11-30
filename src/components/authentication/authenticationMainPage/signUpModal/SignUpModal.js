import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import classnames from 'classnames';

import classes from './signUpModal.module.scss';
import Button from './../../../UI/button/Button';
import Logo from './../../../UI/logo/Logo';
import Spinner from './../../../UI/spinner/Spinner';
import MyFormikInput from './../../../../utilities/myFormikInput/MyFormikInput';
import Input from './../../../UI/input/Input';
import MyFormikSelect from './../../../../utilities/myFormikSelect/MyFormikSelect';

export const SignUpModal = ({ handleFormSubmit, isShown, isLoading }) => {
  const signUpForm = (
    <React.Fragment>
      <div className={classes.logoContainer}>
        <Logo />
      </div>
      <h3 className={classes.title}>Create account</h3>
      <div className={classes.formContainer} data-test={isShown && 'component-sign-up-modal'}>
        <Formik
          initialValues={{ email: '', emailRepeat: '', password: '', passwordRepeat: '', day: '', month: '', year: '', name: '', surname: '' }}
          onSubmit={(values) => {
            handleFormSubmit({
              ...values,
            });
          }}
        >
          {() => {
            return (
              <Form>
                <div>
                  <MyFormikInput as={Input} required name='email' type='email' placeholder='Email address' className={classes.input} />
                  <MyFormikInput as={Input} required name='emailRepeat' type='email' placeholder='Repeat email address' className={classes.input} />
                  <MyFormikInput as={Input} required name='password' type='password' placeholder='Password' className={classes.input} />
                  <MyFormikInput as={Input} required name='passwordRepeat' type='password' placeholder='Repeat Password' className={classes.input} />
                </div>
                <h3 className={classes.birthdayDateTitle}>Your name</h3>
                <MyFormikInput as={Input} required name='name' type='text' placeholder='Name' className={classes.input} />
                <MyFormikInput as={Input} required name='surname' type='text' placeholder='Surname' className={classes.input} />
                <h3 className={classes.birthdayDateTitle}>Date of birth</h3>
                <p className={classes.birthdayDateInfo}>This information will let us know if you have reached appropriate age to use our site.</p>
                <div className={classes.birthSelectsContainer}>
                  <MyFormikSelect type='day' name='day' />
                  <MyFormikSelect type='month' className={classes.selectStreched} name='month' />
                  <MyFormikSelect type='year' name='year' />
                </div>
                <Button dataTest='submit-button' className={classes.button}>
                  Create account
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );

  return <div className={classnames(classes.modal, isShown && classes.modalVisible)}>{isLoading ? <Spinner /> : signUpForm}</div>;
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(SignUpModal);
