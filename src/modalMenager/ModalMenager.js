import React from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '../utilities/hooks/useActions';
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

const ModalMenager = () => {
  const { type } = useSelector((state) => state.modals);
  const { hideModal } = useActions();

  const renderModal = () => {
    if (!type) return <div></div>;

    const ModalComponent = MODAL_COMPONENTS[type];

    return (
      <React.Fragment>
        <Backdrop onClick={hideModal} />
        <ModalComponent />
      </React.Fragment>
    );
  };

  return renderModal();
};

export default ModalMenager;
