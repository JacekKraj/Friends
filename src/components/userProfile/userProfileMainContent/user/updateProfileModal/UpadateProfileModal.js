import React from 'react';
import { connect } from 'react-redux';

import classes from './updateProfileModal.module.scss';
import SpinnerContainer from './../../../../../utilities/spinnerContainer/SpinnerContainer';
import ProfileImageSection from './profileImageSection/ProfileImageSection';
import PersonalInfoSection from './personalInfoSection/PersonalInfoSection';

const UpdateProfileModal = ({ isLoading, currentUser }) => {
  return (
    <div className={classes.updateProfileModalComponent} data-test='component-update-profile-modal'>
      {isLoading && <SpinnerContainer />}
      <ProfileImageSection image={currentUser.profileImage} />
      <PersonalInfoSection user={currentUser} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.userData.isUpdateProfileLoading,
    currentUser: state.userData.currentUser,
  };
};

export default connect(mapStateToProps)(UpdateProfileModal);
