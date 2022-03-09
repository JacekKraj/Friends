import * as actionTypes from './actionsTypes';

export const setShowNav = (isShown) => {
  return {
    type: actionTypes.SET_SHOW_NAV,
    isShown,
  };
};

export const setShowDiscoverBar = (isShown) => {
  return {
    type: actionTypes.SET_SHOW_DISCOVER_BAR,
    isShown,
  };
};
