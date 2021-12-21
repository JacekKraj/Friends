import * as actionTypes from './actionsTypes';
import fire from './../firebaseConfig';
import { failToast } from '../utilities/toasts/toasts';

export const setChat = (chat) => {
  return {
    type: actionTypes.SET_CHAT,
    chat,
  };
};

export const setLast = (lastChat) => {
  return {
    type: actionTypes.SET_LAST_CHAT,
    lastChat,
  };
};

export const setLastChat = (lastChatEmail) => {
  return async (dispatch, getState) => {
    const { modifiedEmail } = getState().userData.currentUser;

    const updates = {};
    updates[`users/${modifiedEmail}/chat/lastChat`] = lastChatEmail;

    try {
      await fire.database().ref().update(updates);

      dispatch(setLast(lastChatEmail));
    } catch (error) {
      failToast(error.message);
    }
  };
};

export const setNotifications = (notifications) => {
  return {
    type: actionTypes.SET_NOTIFICATIONS,
    notifications,
  };
};

export const updateUserNotifications = (userToUpdate, notifications) => {
  return (_) => {
    const updates = {};
    updates[`users/${userToUpdate}/chat/notifications`] = notifications;

    fire.database().ref().update(updates);
  };
};

export const removeNotification = (userToRemove) => {
  return async (dispatch, getState) => {
    const { modifiedEmail } = getState().userData.currentUser;
    const { notifications } = getState().chat;

    const newNotifications = notifications.filter((userEmail) => userEmail !== userToRemove);

    await dispatch(updateUserNotifications(modifiedEmail, newNotifications));
    dispatch(setNotifications(newNotifications));
  };
};

export const addNotification = (textedUserModifiedEmail) => {
  return (dispatch, getState) => {
    const { followedUsers, currentUser } = getState().userData;

    const currNotifications = followedUsers.find((user) => user.modifiedEmail === textedUserModifiedEmail).chat?.notifications || [];
    const newNotifications = [...currNotifications, currentUser.modifiedEmail];

    dispatch(updateUserNotifications(textedUserModifiedEmail, newNotifications));
  };
};
