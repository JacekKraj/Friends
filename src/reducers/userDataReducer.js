import * as actionTypes from './../actions/actionsTypes';
import defaultUserImage from './../assets/images/defaultUserImage.png';

const initialState = {
  currentUser: {
    modifiedEmail: '',
    name: '',
    birthdayDate: {},
    profileImage: defaultUserImage,
    personalInfo: {},
    followedUsersEmails: [],
  },
  unfollowedUsers: [],
  followedUsers: [],
  updateProfileLoading: false,
};

const createUsersType = (usersEmails, allUsers) => {
  const createdUsersType = usersEmails.map((userEmail) => {
    const user = allUsers[userEmail];
    delete user.posts;
    return { modifiedEmail: userEmail, profileImage: defaultUserImage, ...user };
  });
  return createdUsersType;
};

const divideUsers = (emails, allUsers) => {
  const followedUsers = createUsersType(emails.followedUsers, allUsers);
  const unfollowedUsers = createUsersType(emails.unfollowedUsers, allUsers);
  const dividedUsers = { followedUsers, unfollowedUsers };
  return dividedUsers;
};

const updateUserProperties = (user) => {
  const updatedProperties = {
    ...user,
    profileImage: user.profileImage || defaultUserImage,
    personalInfo: user.personalInfo || {},
    followedUsersEmails: user.followedUsersEmails || [],
  };
  delete user.posts;
  return updatedProperties;
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA:
      let currentUser = { ...action.data[action.modifiedEmail], modifiedEmail: action.modifiedEmail };
      currentUser = updateUserProperties(currentUser);

      const unfollowedUsersEmails = Object.keys(action.data).filter((userEmail) => {
        return userEmail !== action.modifiedEmail && !currentUser?.followedUsersEmails.includes(userEmail);
      });

      const usersEmails = {
        followedUsers: currentUser.followedUsersEmails,
        unfollowedUsers: unfollowedUsersEmails,
      };
      const { unfollowedUsers, followedUsers } = divideUsers(usersEmails, action.data);

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
