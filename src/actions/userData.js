import * as actionTypes from "./actionsTypes";

export const setDefaultUserData = (data) => {
  return {
    type: actionTypes.SET_DEFAULT_USER_DATA,
    data: data,
  };
};
