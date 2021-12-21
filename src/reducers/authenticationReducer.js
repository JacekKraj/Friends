import * as actionTypes from './../actions/actionsTypes';

const initialState = {
  authenticated: false,
  isLoading: false,
  fireUser: null,
};
const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REGISTER_END:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        authenticated: false,
        isLoading: false,
        fireUser: null,
      };
    case actionTypes.AUTHENTICATION_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.AUTHENTICATION_END:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        fireUser: action.fireUser,
      };
    case actionTypes.AUTHENTICATION_FAIL:
      return {
        ...state,
        isLoading: false,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
