import React from 'react';
import { useSelector } from 'react-redux';

import classes from './updateProfileModal.module.scss';
import SpinnerContainer from './../../../../../utilities/spinnerContainer/SpinnerContainer';
import ProfileImageSection from './profileImageSection/ProfileImageSection';
import PersonalInfoSection from './personalInfoSection/PersonalInfoSection';

const UpdateProfileModal = () => {
  const { isUpdateProfileLoading } = useSelector((state) => state.userData);

  return (
    <div className={classes.updateProfileModalComponent} data-test='component-update-profile-modal'>
      {isUpdateProfileLoading && <SpinnerContainer />}
      <ProfileImageSection />
      <PersonalInfoSection />
    </div>
  );
};

export default UpdateProfileModal;
