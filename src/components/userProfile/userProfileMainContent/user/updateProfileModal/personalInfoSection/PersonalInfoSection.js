import React from 'react';
import { Formik, Form } from 'formik';
import lodash from 'lodash';
import { connect } from 'react-redux';

import classes from './personalInfoSection.module.scss';
import Button from './../../../../../UI/button/Button';
import MyFormikInput from '../../../../../../utilities/myFormikInput/MyFormikInput';
import Input from '../../../../../UI/input/Input';
import * as actions from './../../../../../../actions/index';

const personalInfoSection = ({ user, onSetPersonalInfo }) => {
  const trimPersonalInfo = (info) => {
    for (let [key, value] of Object.entries(info)) {
      info[key] = value.trim();
    }
  };

  const submitPersonalInfoChanges = (updatedInfo) => {
    const newUpdatedInfo = { ...updatedInfo };
    trimPersonalInfo(newUpdatedInfo);

    const isPersonalInfoChanged = !lodash.isEqual(newUpdatedInfo, user.personalInfo);

    if (isPersonalInfoChanged) {
      onSetPersonalInfo(newUpdatedInfo, user.modifiedEmail);
    }
  };

  return (
    <div className={classes.profileInfoSec}>
      <Formik
        initialValues={{
          profileDescription: user.personalInfo?.profileDescription || '',
          work: user.personalInfo?.work || '',
          gender: user.personalInfo?.gender || '',
          home: user.personalInfo?.home || '',
        }}
        onSubmit={submitPersonalInfoChanges}
      >
        {() => {
          return (
            <Form>
              <h3 className={classes.header}>User info</h3>
              <div className={classes.inputsContainer}>
                <MyFormikInput
                  className={classes.input}
                  name='profileDescription'
                  type='text'
                  placeholder='Profile description'
                  required={false}
                  as={Input}
                />
                <MyFormikInput className={classes.input} name='work' type='text' placeholder='Work place' required={false} as={Input} />
                <MyFormikInput className={classes.input} name='gender' type='text' placeholder='Gender' required={false} as={Input} />
                <MyFormikInput className={classes.input} name='home' type='text' placeholder='Place of residence' required={false} as={Input} />
              </div>
              <Button isTransparent={false} className={classes.button}>
                Update info
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPersonalInfo: (info, modifiedEmail) => dispatch(actions.setPersonalInfo(info, modifiedEmail)),
  };
};

export default connect(null, mapDispatchToProps)(personalInfoSection);
