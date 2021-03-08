import * as actionTypes from "./actionsTypes";
import fire from "./../firebaseConfig";

import { failToast } from "./../utilities/toasts/toasts";
import { modifyEmail } from "./../utilities/helperFunctions/modifyEmail";

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

export const register = (email, password, hideModalHandler, name, surname, birthdayDate) => {
  return (dispatch) => {
    dispatch(registerStart());
    const modifiedEmail = modifyEmail(email);
    fire
      .database()
      .ref(`users/${modifiedEmail}`)
      .set({
        email,
        name: `${name} ${surname}`,
        birthdayDate,
      })
      .then(() => {
        fire
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            fire
              .auth()
              .currentUser.sendEmailVerification()
              .then(() => {
                dispatch(registerEnd());
                hideModalHandler();
              })
              .catch((error) => {
                dispatch(registerFail());
                failToast(error.message);
              });
          })
          .catch((error) => {
            dispatch(registerFail());
            failToast(error.message);
          });
      })
      .catch((error) => {
        dispatch(registerFail());
        failToast(error.message);
      });
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
  return (dispatch) => {
    dispatch(authenticationStart());
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((error) => {
        failToast(error.message);
        dispatch(authenticationFail());
      });
  };
};

export const logout = () => {
  fire.auth().signOut();
  return {
    type: actionTypes.LOG_OUT,
  };
};
