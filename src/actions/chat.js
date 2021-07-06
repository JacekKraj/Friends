import * as actionTypes from "./actionsTypes";
import fire from "./../firebaseConfig";

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

export const setLastChat = (currUser, lastChat) => {
  return (dispatch) => {
    const updates = {};
    updates[`users/${currUser}/chat/lastChat`] = lastChat;
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch(setLast(lastChat));
      });
  };
};

export const setChatNotifications = (notifications) => {
  return {
    type: actionTypes.SET_CHAT_NOTIFICATIONS,
    notifications,
  };
};

export const sendNotification = (userToSend, notifications) => {
  return (dispatch) => {
    const updates = {};
    updates[`users/${userToSend}/chat/notifications`] = notifications;
    fire.database().ref().update(updates);
  };
};

export const removeNotification = (currUser, userToRemove, notifications) => {
  return (dispatch) => {
    const newNotifications = notifications.filter((el) => el !== userToRemove);
    dispatch(sendNotification(currUser, newNotifications));
    dispatch(setChatNotifications(newNotifications));
  };
};
