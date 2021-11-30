import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import lodash from 'lodash';

import Input from './../../../../UI/input/Input';
import MyFormikInput from './../../../../../utilities/myFormikInput/MyFormikInput';
import Backdrop from '../../../../UI/backdrop/Backdrop';
import classes from './updateProfileModal.module.scss';
import Button from './../../../../UI/button/Button';
import FileInput from './../../../../pagesComponents/imageFileInput/ImageFileInput';
import * as actions from './../../../../../actions/index';
import SpinnerContainer from './../../../../../utilities/spinnerContainer/SpinnerContainer';

const UpdateProfileModal = (props) => {
  const { onSetPersonalInfo, onSetUserImage, isLoading, hideModal, user } = props;

  const [newProfileImage, setNewProfileImage] = React.useState({ url: null });

  const onDropHandler = (image) => {
    setNewProfileImage(image);
  };

  const updateImage = () => {
    const isNewImageAdded = !!newProfileImage.url;
    if (isNewImageAdded) {
      onSetUserImage(newProfileImage, user.modifiedEmail);
    }
  };

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
    <React.Fragment>
      <Backdrop
        onClick={() => {
          !isLoading && hideModal();
        }}
      />
      <div className={classes.updateProfileModalComponent} data-test='component-update-profile-modal'>
        {isLoading && <SpinnerContainer />}
        <div className={classes.profileImageSec}>
          <img className={classes.profileImage} src={newProfileImage.url || user.profileImage} alt='user profile image' />
          <div className={classes.profileImageButtons}>
            <FileInput onDropHandler={onDropHandler}>
              <Button className={classes.button} isTransparent>
                Choose new image
              </Button>
            </FileInput>
            <Button className={classes.button} isTransparent={false} onClick={updateImage}>
              Update image
            </Button>
          </div>
        </div>
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
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.userData.updateProfileLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserImage: (img, modifiedEmail) => dispatch(actions.setUserProfileImage(img, modifiedEmail)),
    onSetPersonalInfo: (info, modifiedEmail) => dispatch(actions.setPersonalInfo(info, modifiedEmail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileModal);
