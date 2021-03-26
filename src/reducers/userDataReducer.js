import * as actionTypes from "./../actions/actionsTypes";

const initialState = {
  email: "",
  modifiedEmail: "",
  name: "",
  dateOfBirth: {},
  profileImage: null,
  unfollowedUsers: [],
  followedUsers: [],
  followedUsersEmails: [],
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEFAULT_USER_DATA:
      const currentUser = action.data[action.modifiedEmail];
      const followedUsersEmails = action.data[action.modifiedEmail]?.followedUsers ? action.data[action.modifiedEmail]?.followedUsers : [];
      const unfollowedUsersEmails = Object.keys(action.data).filter((el) => {
        return el !== action.modifiedEmail && !followedUsersEmails.includes(el);
      });
      const unfollowedUsers = unfollowedUsersEmails.map((el) => {
        return { modifiedEmail: el, name: action.data[el].name, birthdayDate: action.data[el].birthdayDate };
      });
      const followedUsers = followedUsersEmails.map((el) => {
        return { modifiedEmail: el, name: action.data[el].name, birthdayDate: action.data[el].birthdayDate };
      });
      return {
        ...state,
        unfollowedUsers,
        email: currentUser?.email,
        modifiedEmail: action.modifiedEmail,
        name: currentUser?.name,
        dateOfBirth: currentUser?.birthdayDate,
        followedUsers,
        followedUsersEmails,
      };
    case actionTypes.FOLLOW_USER:
      const followedUserData = {
        birthdayDate: action.userToFollowData.birthdayDate,
        name: action.userToFollowData.name,
        modifiedEmail: action.userToFollow,
      };
      const oldUnfollowedUserIndex = state.unfollowedUsers.findIndex((el) => {
        return el.modifiedEmail === action.userToFollow;
      });
      const newUnfollowedUsers = [...state.unfollowedUsers];
      newUnfollowedUsers.splice(oldUnfollowedUserIndex, 1);
      return {
        ...state,
        followedUsersEmails: [...state.followedUsersEmails, action.userToFollow],
        followedUsers: [...state.followedUsers, followedUserData],
        unfollowedUsers: newUnfollowedUsers,
      };
    default:
      return state;
  }
};

export default userDataReducer;
