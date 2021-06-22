import React from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";

import Input from "./../../../../UI/input/Input";
import MyFormikInput from "./../../../../../utilities/myFormikInput/MyFormikInput";
import Backdrop from "../../../../UI/backdrop/Backdrop";
import classes from "./updateProfileModal.module.scss";
import Button from "./../../../../UI/button/Button";
import FileInput from "./../../../../pagesComponents/fileInput/FileInput";
import * as actions from "./../../../../../actions/index";
import SpinnerContainer from "./../../../../../utilities/spinnerContainer/SpinnerContainer";

const UpdateProfileModal = (props) => {
  const [profileImage, setProfileImage] = React.useState([{ preview: null }]);

  const handleDrop = React.useCallback((event) => {
    const newImages = [event.target.files[0]].map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setProfileImage(newImages);
  }, []);

  const updateImage = React.useCallback(() => {
    if (profileImage[0].preview) {
      props.onSetUserImage(profileImage[0], props.modifiedEmail);
    }
  }, [profileImage[0].preview]);

  const handleSubmit = React.useCallback((updatedInfo) => {
    const newUpdatedInfo = { ...updatedInfo };
    for (let [key, value] of Object.entries(newUpdatedInfo)) {
      newUpdatedInfo[key] = value.trim();
    }
    if (JSON.stringify(newUpdatedInfo) !== JSON.stringify(props.personalInfo)) {
      props.onSetPersonalInfo(newUpdatedInfo, props.modifiedEmail);
    }
  }, []);
  return (
    <React.Fragment>
      <Backdrop
        onClick={() => {
          !props.isLoading && props.handleHideModal();
        }}
      />
      <div className={classes.updateProfileModalComponent} data-test="component-update-profile-modal">
        {props.isLoading && <SpinnerContainer />}
        <div className={classes.profileImageSec}>
          <img className={classes.profileImage} src={profileImage[0].preview || props.profileImage} alt="user profile image" />
          <div className={classes.profileImageButtons}>
            <FileInput handleDrop={handleDrop}>
              <Button className={classes.button} transparent={true}>
                Choose new image
              </Button>
            </FileInput>
            <Button className={classes.button} transparent={false} onClick={updateImage}>
              Update image
            </Button>
          </div>
        </div>
        <div className={classes.profileInfoSec}>
          <Formik
            initialValues={{
              profileDescription: props.personalInfo?.profileDescription || "",
              work: props.personalInfo?.work || "",
              gender: props.personalInfo?.gender || "",
              home: props.personalInfo?.home || "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {() => {
              return (
                <Form>
                  <h3 className={classes.header}>User info</h3>
                  <div className={classes.inputsContainer}>
                    <MyFormikInput
                      className={classes.input}
                      name="profileDescription"
                      type="text"
                      placeholder="Profile description"
                      required={false}
                      as={Input}
                    />
                    <MyFormikInput className={classes.input} name="work" type="text" placeholder="Work place" required={false} as={Input} />
                    <MyFormikInput className={classes.input} name="gender" type="text" placeholder="Gender" required={false} as={Input} />
                    <MyFormikInput className={classes.input} name="home" type="text" placeholder="Place of residence" required={false} as={Input} />
                  </div>
                  <Button transparent={false} className={classes.button}>
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
