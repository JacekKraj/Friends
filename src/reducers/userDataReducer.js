import * as actionTypes from "./../actions/actionsTypes";
import defaultUserImage from "./../assets/images/defaultUserImage.png";

const initialState = {
  currentUser: {
    modifiedEmail: "",
    name: "",
    birthdayDate: {},
    profileImage: defaultUserImage,
    personalInfo: {},
    followedUsersEmails: [],
  },
  unfollowedUsers: [],
  followedUsers: [],
  updateProfileLoading: false,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      const currentUser = { ...action.data[action.modifiedEmail], modifiedEmail: action.modifiedEmail };
      currentUser.profileImage = currentUser.profileImage || defaultUserImage;
      currentUser.personalInfo = currentUser.personalInfo || {};
      delete currentUser.posts;
      currentUser.followedUsersEmails = currentUser.followedUsersEmails || [];
      const unfollowedUsersEmails = Object.keys(action.data).filter((el) => {
        return el !== action.modifiedEmail && !currentUser?.followedUsersEmails.includes(el);
      });
      const unfollowedUsers = unfollowedUsersEmails.map((el) => {
        const user = action.data[el];
        delete user.posts;
        return { modifiedEmail: el, profileImage: defaultUserImage, ...user };
      });
      const followedUsers = currentUser?.followedUsersEmails.map((el) => {
        const user = action.data[el];
        delete user.posts;
        return { modifiedEmail: el, profileImage: defaultUserImage, ...user };
      });
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...currentUser,
        },
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
    case actionTypes.SET_CURR_USER_PROFILE_IMAGE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          profileImage: action.image,
        },
      };
    case actionTypes.SET_UPDATE_PROFILE_LOADING:
      return {
        ...state,
        updateProfileLoading: action.loading,
      };
    case actionTypes.SET_PERSONAL_INFO:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          personalInfo: {
            ...action.info,
          },
        },
      };
    default:
      return state;
  }
};

export default userDataReducer;
