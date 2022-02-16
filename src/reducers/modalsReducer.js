import * as actionTypes from './../actions/actionsTypes';

const initialState = {
  type: '',
  props: {},
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        type: action.modalType,
        props: action.props,
      };
    case actionTypes.HIDE_MODAL:
      return {
        ...state,
        type: '',
        props: {},
      };
    default:
      return state;
  }
};

export default modalsReducer;
