import fire from "./../firebaseConfig";
import * as actionTypes from "./actionsTypes";
import { failToast, successToast } from "./../utilities/toasts/toasts";
import * as actions from "./index";

export const setUserData = (data, modifiedEmail) => {
  return {
    type: actionTypes.SET_USER_DATA,
    data,
    modifiedEmail,
  };
};

export const setFollowedUsers = (user, newFollowedUsersEmails, usersToReduce, usersToIncrease) => {
  return {
    type: actionTypes.SET_FOLLOWED_USERS,
    user,
    newFollowedUsersEmails,
    usersToReduce,
    usersToIncrease,
  };
};

export const followUser = (userToFollow, currentUser, followedUsersEmails) => {
  return (dispatch) => {
    const updates = {};
    const newFollowedUsers = [...followedUsersEmails, userToFollow];
    updates[`users/${currentUser}/followedUsersEmails`] = newFollowedUsers;
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch(setFollowedUsers(userToFollow, newFollowedUsers, "unfollowedUsers", "followedUsers"));
        dispatch(actions.getUsersPosts(userToFollow, () => {}));
      })
      .catch((error) => {
        failToast(error.message);
      });
  };
};

export const unfollowUser = (userToUnfollow, currentUser, followedUsersEmails) => {
  return (dispatch) => {
    const updates = {};
    const newFollowedUsers = followedUsersEmails.filter((el) => el !== userToUnfollow);
    updates[`users/${currentUser}/followedUsersEmails`] = [...newFollowedUsers];
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch(setFollowedUsers(userToUnfollow, newFollowedUsers, "followedUsers", "unfollowedUsers"));
      })
      .catch((error) => {
        failToast(error.message);
      });
  };
};

export const setUpdateProfileLoading = (loading) => {
  return {
    type: actionTypes.SET_UPDATE_PROFILE_LOADING,
    loading,
  };
};

const setProfileImage = (image) => {
  return {
    type: actionTypes.SET_CURR_USER_PROFILE_IMAGE,
    image,
  };
};

export const setUserProfileImage = (image, userEmail) => {
  return (dispatch) => {
    dispatch(setUpdateProfileLoading(true));
    fire
      .storage()
      .ref(`users/${userEmail}/profileImage`)
      .put(image)
      .then(() => {
        fire
          .storage()
          .ref(`users/${userEmail}/profileImage`)
          .getDownloadURL()
          .then((url) => {
            const updates = {};
            updates[`users/${userEmail}/profileImage`] = url;
            fire
              .database()
              .ref()
              .update(updates)
              .then(() => {
                dispatch(setProfileImage(url));
                successToast("Your profile image has been changed.");
                dispatch(setUpdateProfileLoading(false));
              });
          })
          .catch((error) => {
            failToast(error.message);
            dispatch(setUpdateProfileLoading(false));
          });
      })
      .catch((error) => {
        failToast(error.message);
        dispatch(setUpdateProfileLoading(false));
      });
  };
};

const setInfo = (info) => {
  return {
    type: actionTypes.SET_PERSONAL_INFO,
    info,
  };
};

export const setPersonalInfo = (info, userEmail) => {
  return (dispatch) => {
    dispatch(setUpdateProfileLoading(true));
    const updates = {};
    updates[`users/${userEmail}/personalInfo`] = info;
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch(setInfo(info));
        dispatch(setUpdateProfileLoading(false));
        successToast("Your profile has benn updated.");
      })
      .catch((error) => {
        failToast(error.message);
        dispatch(setUpdateProfileLoading(false));
      });
  };
};
