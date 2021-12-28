import React from 'react';
import { connect } from 'react-redux';

import Backdrop from '../../../../UI/backdrop/Backdrop';
import classes from './updateProfileModal.module.scss';
import SpinnerContainer from './../../../../../utilities/spinnerContainer/SpinnerContainer';
import ProfileImageSection from './profileImageSection/ProfileImageSection';
import PersonalInfoSection from './personalInfoSection/PersonalInfoSection';

const UpdateProfileModal = (props) => {
  const { isLoading, hideModal, user } = props;

  const handleBacdkropClick = () => {
    !isLoading && hideModal();
  };

  return (
    <React.Fragment>
      <Backdrop onClick={handleBacdkropClick} />
      <div className={classes.updateProfileModalComponent} data-test='component-update-profile-modal'>
        {isLoading && <SpinnerContainer />}
        <ProfileImageSection image={user.profileImage} />
        <PersonalInfoSection user={user} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.userData.isUpdateProfileLoading,
  };
};

export default connect(mapStateToProps)(UpdateProfileModal);
