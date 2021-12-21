import * as actionTypes from './actionsTypes';
import fire from './../firebaseConfig';

import { failToast } from './../utilities/toasts/toasts';
import { modifyEmail } from './../utilities/helperFunctions/modifyEmail';

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

export const registerEnd = () => {
  return {
    type: actionTypes.REGISTER_END,
  };
};

export const registerFail = () => {
  return {
    type: actionTypes.REGISTER_FAIL,
  };
};

const setNewUserIntoDatabase = (createdUserData) => {
  const { email, name, surname, birthdayDate } = createdUserData;
  const modifiedEmail = modifyEmail(email);

  fire
    .database()
    .ref(`users/${modifiedEmail}`)
    .set({
      email,
      name: `${name} ${surname}`,
      birthdayDate,
    });
};

export const register = (createdUserData, hideModal) => {
  const { email, password } = createdUserData;

  return async (dispatch) => {
    dispatch(registerStart());

    try {
      await setNewUserIntoDatabase(createdUserData);
      await fire.auth().createUserWithEmailAndPassword(email, password);
      await fire.auth().currentUser.sendEmailVerification();

      dispatch(registerEnd());
      hideModal();
    } catch (error) {
      dispatch(registerFail());
      failToast(error.message);
    }
  };
};

export const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START,
  };
};

export const authenticationEnd = (fireUser) => {
  return {
    type: actionTypes.AUTHENTICATION_END,
    fireUser: fireUser,
  };
};

export const authenticationFail = () => {
  return {
    type: actionTypes.AUTHENTICATION_FAIL,
  };
};

export const authenticate = (email, password) => {
  return async (dispatch) => {
    dispatch(authenticationStart());

    try {
      await fire.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      failToast(error.message);
      dispatch(authenticationFail());
    }
  };
};

export const logout = () => {
  fire.auth().signOut();
  return {
    type: actionTypes.LOG_OUT,
  };
};
