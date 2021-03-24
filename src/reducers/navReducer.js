import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  showNav: false,
  showDiscoverBar: false,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHOW_NAV:
      return {
        ...state,
        showNav: action.show,
      };
    case actionTypes.SET_SHOW_DISCOVER_BAR:
      return {
        ...state,
        showDiscoverBar: action.show,
      };
    default:
      return state;
  }
};

export default navReducer;
