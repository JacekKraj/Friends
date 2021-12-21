import fire from './../firebaseConfig';
import * as actionTypes from './actionsTypes';
import { failToast, successToast } from './../utilities/toasts/toasts';
import * as actions from './index';

export const setUserData = (data, modifiedEmail) => {
  return {
    type: actionTypes.SET_USER_DATA,
    data,
    modifiedEmail,
  };
};

export const setFollowedUsers = (user, users) => {
  const { newFollowedEmails, toReduce, toIncrease } = users;

  return {
    type: actionTypes.SET_FOLLOWED_USERS,
    user,
    newFollowedUsersEmails: newFollowedEmails,
    usersToReduce: toReduce,
    usersToIncrease: toIncrease,
  };
};

const updateFollowedUsers = (user, users) => {
  return async (dispatch, getState) => {
    const { modifiedEmail } = getState().userData.currentUser;

    const updates = {};
    updates[`users/${modifiedEmail}/followedUsersEmails`] = users.newFollowedEmails;

    try {
      await fire.database().ref().update(updates);
    } catch (error) {
      failToast(error.message);
    }

    dispatch(setFollowedUsers(user, users));
  };
};

export const followUser = (userToFollow) => {
  return async (dispatch, getState) => {
    const { followedUsersEmails } = getState().userData.currentUser;

    const newFollowedUsersEmails = [...followedUsersEmails, userToFollow];

    const users = {
      newFollowedEmails: newFollowedUsersEmails,
      toReduce: 'unfollowedUsers',
      toIncrease: 'followedUsers',
    };

    await dispatch(updateFollowedUsers(userToFollow, users));

    dispatch(actions.getUserPosts(userToFollow, () => {}));
  };
};

export const unfollowUser = (userToUnfollow) => {
  return async (dispatch, getState) => {
    const { followedUsersEmails } = getState().userData.currentUser;

    const newFollowedUsersEmails = followedUsersEmails.filter((email) => email !== userToUnfollow);

    const users = {
      newFollowedEmails: newFollowedUsersEmails,
      toReduce: 'followedUsers',
      toIncrease: 'unfollowedUsers',
    };

    dispatch(updateFollowedUsers(userToUnfollow, users));
  };
};

export const setIsUpdateProfileLoading = (loading) => {
  return {
    type: actionTypes.SET_IS_UPDATE_PROFILE_LOADING,
    loading,
  };
};

const setProfileImage = (image) => {
  return {
    type: actionTypes.SET_CURR_USER_PROFILE_IMAGE,
    image,
  };
};

export const setUserProfileImage = (image) => {
  return async (dispatch, getState) => {
    const { modifiedEmail } = getState().userData.currentUser;

    dispatch(setIsUpdateProfileLoading(true));

    try {
      const storageRef = fire.storage().ref(`users/${modifiedEmail}/profileImage`);

      await storageRef.put(image);

      const url = await storageRef.getDownloadURL();

      const updates = {};
      updates[`users/${modifiedEmail}/profileImage`] = url;

      await fire.database().ref().update(updates);

      dispatch(setProfileImage(url));
      successToast('Your profile image has been changed.');
    } catch (error) {
      failToast(error.message);
    }

    dispatch(setIsUpdateProfileLoading(false));
  };
};

const setInfo = (info) => {
  return {
    type: actionTypes.SET_PERSONAL_INFO,
    info,
  };
};

export const setPersonalInfo = (info) => {
  return async (dispatch, getState) => {
    const { modifiedEmail } = getState().userData.currentUser;

    dispatch(setIsUpdateProfileLoading(true));

    const updates = {};
    updates[`users/${modifiedEmail}/personalInfo`] = info;

    try {
      await fire.database().ref().update(updates);

      dispatch(setInfo(info));

      successToast('Your profile info has been updated.');
    } catch (error) {
      failToast(error.message);
    }

    dispatch(setIsUpdateProfileLoading(false));
  };
};
