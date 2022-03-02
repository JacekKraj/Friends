import React from 'react';
import { Formik, Form } from 'formik';
import lodash from 'lodash';
import { useSelector } from 'react-redux';

import { useActions } from '../../../../../../utilities/hooks/useActions';
import classes from './personalInfoSection.module.scss';
import Button from './../../../../../UI/button/Button';
import MyFormikInput from '../../../../../../utilities/myFormikInput/MyFormikInput';
import Input from '../../../../../UI/input/Input';

const PersonalInfoSection = () => {
  const { personalInfo } = useSelector((state) => state.userData.currentUser);
  const { setPersonalInfo } = useActions();

  const trimPersonalInfo = (info) => {
    for (let [key, value] of Object.entries(info)) {
      info[key] = value.trim();
    }
  };

  const submitPersonalInfoChanges = (updatedInfo) => {
    const newUpdatedInfo = { ...updatedInfo };
    trimPersonalInfo(newUpdatedInfo);

    const isPersonalInfoChanged = !lodash.isEqual(newUpdatedInfo, personalInfo);

    if (isPersonalInfoChanged) {
      setPersonalInfo(newUpdatedInfo);
    }
  };

  return (
    <div className={classes.profileInfoSec}>
      <Formik
        initialValues={{
          profileDescription: personalInfo?.profileDescription || '',
          work: personalInfo?.work || '',
          gender: personalInfo?.gender || '',
          home: personalInfo?.home || '',
        }}
        onSubmit={submitPersonalInfoChanges}
        data-test='personal-info-section-form'
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

export default PersonalInfoSection;
