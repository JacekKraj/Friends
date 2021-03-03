import React from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";

import classes from "./signUpModal.module.scss";
import Button from "./../../../UI/button/Button";
import Logo from "./../../../UI/logo/Logo";
import Spinner from "./../../../UI/spinner/Spinner";
import MyFormikInput from "./../../../../utilities/myFormikInput/MyFormikInput";
import Input from "./../../../UI/input/Input";
import MyFormikSelect from "./../../../../utilities/myFormikSelect/MyFormikSelect";

export const SignUpModal = (props) => {
  let content = props.show && (
    <div data-test="component-sign-up-modal">
      <div className={classes.modal}>
        <div className={classes.logoContainer}>
          <Logo />
        </div>
        <h3 className={classes.title}>Create account</h3>
        <div className={classes.formContainer}>
          <Formik
            initialValues={{ email: "", emailRepeat: "", password: "", passwordRepeat: "", day: "", month: "", year: "", name: "", surname: "" }}
            onSubmit={(values) => {
              props.handleSubmit({
                ...values,
              });
            }}
          >
            {() => {
              return (
                <Form>
                  <div>
                    <MyFormikInput as={Input} required={true} name="email" type="email" placeholder="Email address" className={classes.input} />
                    <MyFormikInput
                      as={Input}
                      required={true}
                      name="emailRepeat"
                      type="email"
                      placeholder="Repeat email address"
                      className={classes.input}
                    />
                    <MyFormikInput as={Input} required={true} name="password" type="password" placeholder="Password" className={classes.input} />
                    <MyFormikInput
                      as={Input}
                      required={true}
                      name="passwordRepeat"
                      type="password"
                      placeholder="Repeat Password"
                      className={classes.input}
                    />
                  </div>
                  <h3 className={classes.dateOfBirthTitle}>Your name</h3>
                  <MyFormikInput as={Input} required={true} name="name" type="text" placeholder="Name" className={classes.input} />
                  <MyFormikInput as={Input} required={true} name="surname" type="text" placeholder="Surname" className={classes.input} />
                  <h3 className={classes.dateOfBirthTitle}>Date of birth</h3>
                  <p className={classes.dateOfBirthInfo}>This information will let us know if you have reached appropriate age to use our site.</p>
                  <div className={classes.birthSelectsContainer}>
                    <MyFormikSelect type="day" name="day" />
                    <MyFormikSelect type="month" className={classes.selectStreched} name="month" />
                    <MyFormikSelect type="year" name="year" />
                  </div>
                  <Button dataTest="submit-button" className={classes.button}>
                    Create account
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

export default connect(mapStateToProps)(SignUpModal);
