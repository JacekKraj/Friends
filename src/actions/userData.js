import fire from "./../firebaseConfig";
import * as actionTypes from "./actionsTypes";
import { failToast } from "./../utilities/toasts/toasts";
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
