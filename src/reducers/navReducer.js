import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  isShownNav: false,
  isShownDiscoverBar: false,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHOW_NAV:
      return {
        ...state,
        isShownNav: action.isShown,
      };
    case actionTypes.SET_SHOW_DISCOVER_BAR:
      return {
        ...state,
        isShownDiscoverBar: action.isShown,
      };
    default:
      return state;
  }
};

export default navReducer;
