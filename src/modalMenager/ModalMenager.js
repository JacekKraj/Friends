import React from 'react';
import { connect } from 'react-redux';

import * as actions from './../actions';
import SignInModal from './../components/authentication/authenticationMainPage/signInModal/SignInModal';
import SignUpModal from './../components/authentication/authenticationMainPage/signUpModal/SignUpModal';
import PostEditionModal from '../components/pagesComponents/posts/post/postEditionModal/PostEditionModal';
import UpadateProfileModal from '../components/userProfile/userProfileMainContent/user/updateProfileModal/UpadateProfileModal';
import Backdrop from './../components/UI/backdrop/Backdrop';

export const MODAL_TYPES = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  POST_EDITION: 'POST_EDITION',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
};

const MODAL_COMPONENTS = {
  [MODAL_TYPES.SIGN_IN]: SignInModal,
  [MODAL_TYPES.SIGN_UP]: SignUpModal,
  [MODAL_TYPES.POST_EDITION]: PostEditionModal,
  [MODAL_TYPES.UPDATE_PROFILE]: UpadateProfileModal,
};

const ModalMenager = ({ type, onHideModal }) => {
  const renderModal = () => {
    if (!type) return <div></div>;

    const ModalComponent = MODAL_COMPONENTS[type];

    return (
      <React.Fragment>
        <Backdrop onClick={onHideModal} />
        <ModalComponent />
      </React.Fragment>
    );
  };

  return renderModal();
};

const mapStateToProps = (state) => {
  return {
    type: state.modals.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHideModal: () => dispatch(actions.hideModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalMenager);
