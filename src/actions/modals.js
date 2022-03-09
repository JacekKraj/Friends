import * as actionTypes from './actionsTypes';

export const showModal = (modalType, props) => {
  return {
    type: actionTypes.SHOW_MODAL,
    modalType,
    props,
  };
};

export const hideModal = () => {
  return {
    type: actionTypes.HIDE_MODAL,
  };
};
