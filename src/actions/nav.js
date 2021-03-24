import * as actionTypes from "./actionsTypes";

export const setShowNav = (show) => {
  return {
    type: actionTypes.SET_SHOW_NAV,
    show,
  };
};

export const setShowDiscoverBar = (show) => {
  return {
    type: actionTypes.SET_SHOW_DISCOVER_BAR,
    show,
  };
};
