import fire from "./../firebaseConfig";
import * as actionTypes from "./actionsTypes";
import { failToast } from "./../utilities/toasts/toasts";
import * as actions from "./index";

export const setDefaultUserData = (data, modifiedEmail) => {
  return {
    type: actionTypes.SET_DEFAULT_USER_DATA,
    data,
    modifiedEmail,
  };
};

const setFollowedUsers = (userToFollow, userToFollowData) => {
  return {
    type: actionTypes.FOLLOW_USER,
    userToFollow,
    userToFollowData,
  };
};

export const followUser = (userToFollow, currentUser, followedUsersEmails) => {
  return (dispatch) => {
    const updates = {};
    updates[`users/${currentUser}/followedUsers`] = [...followedUsersEmails, userToFollow];
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        fire
          .database()
          .ref(`users/${userToFollow}`)
          .get()
          .then((snapshot) => {
            dispatch(setFollowedUsers(userToFollow, snapshot.val()));
            dispatch(actions.getUsersPosts(userToFollow));
          });
      })
      .catch((error) => {
        failToast(error.message);
      });
  };
};
