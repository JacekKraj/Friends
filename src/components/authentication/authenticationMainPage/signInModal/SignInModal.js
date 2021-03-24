import React from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";

import classes from "./signInModal.module.scss";
import Button from "./../../../UI/button/Button";
import Logo from "./../../../UI/logo/Logo";
import MyFormikInput from "./../../../../utilities/myFormikInput/MyFormikInput";
import Input from "./../../../UI/input/Input";
import Spinner from "./../../../UI/spinner/Spinner";

const SignInModal = (props) => {
  let content = props.show && (
    <div data-test="component-sign-in-modal">
      <div className={classes.modal}>
        <div className={classes.logoContainer}>
          <Logo />
        </div>
        <h3 className={classes.title}>Log in to Friends</h3>
        <div className={classes.formContainer}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              props.handleSubmit(values);
            }}
          >
            {() => {
              return (
                <Form>
                  <div>
                    <MyFormikInput as={Input} required={true} name="email" type="email" placeholder="Email address" className={classes.input} />
                    <MyFormikInput as={Input} required={true} name="password" type="password" placeholder="Password" className={classes.input} />
                  </div>
                  <Button className={classes.button} transparent={true}>
                    Sign in
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      )
    </div>
  );

  content = props.isLoading ? (
    <div className={classes.modal}>
      <Spinner />
    </div>
  ) : (
    content
  );

  return content;
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(SignInModal);
