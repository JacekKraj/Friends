import * as actionTypes from "./../actions/actionsTypes";

const initialState = {
  authenticated: false,
  loading: false,
};
const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.REGISTER_END:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        authenticated: false,
        loading: false,
      };
    case actionTypes.AUTHENTICATION_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTHENTICATION_END:
      return {
        ...state,
        loading: false,
        authenticated: true,
        fireUser: action.fireUser,
      };
    case actionTypes.AUTHENTICATION_FAIL:
      return {
        ...state,
        loading: false,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
