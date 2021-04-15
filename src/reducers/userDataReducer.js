import * as actionTypes from "./../actions/actionsTypes";

const initialState = {
  currentUser: {
    modifiedEmail: "",
    name: "",
    birthdayDate: {},
    profileImage: null,
    followedUsersEmails: [],
  },
  unfollowedUsers: [],
  followedUsers: [],
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      const currentUser = { ...action.data[action.modifiedEmail], modifiedEmail: action.modifiedEmail };
      delete currentUser.posts;
      currentUser.followedUsersEmails = currentUser.followedUsersEmails ? currentUser.followedUsersEmails : [];
      const unfollowedUsersEmails = Object.keys(action.data).filter((el) => {
        return el !== action.modifiedEmail && !currentUser?.followedUsersEmails.includes(el);
      });
      const unfollowedUsers = unfollowedUsersEmails.map((el) => {
        const user = action.data[el];
        delete user.posts;
        return { modifiedEmail: el, ...user };
      });
      const followedUsers = currentUser?.followedUsersEmails.map((el) => {
        const user = action.data[el];
        delete user.posts;
        return { modifiedEmail: el, ...user };
      });
      return {
        ...state,
        currentUser,
        unfollowedUsers,
        followedUsers,
      };
    case actionTypes.SET_FOLLOWED_USERS:
      const users = [...state[action.usersToReduce]];
      const userIndex = users.findIndex((el) => el.modifiedEmail === action.user);
      const user = users.splice(userIndex, 1);
      return {
        ...state,
        [action.usersToReduce]: users,
        currentUser: {
          ...state.currentUser,
          followedUsersEmails: action.newFollowedUsersEmails,
        },
        [action.usersToIncrease]: [...state[action.usersToIncrease], ...user],
      };
    default:
      return state;
  }
};

export default userDataReducer;
