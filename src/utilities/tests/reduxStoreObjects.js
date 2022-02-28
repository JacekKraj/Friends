import defaultUserImage from './../../assets/images/defaultUserImage.png';

export const birthdayDate = {
  day: 1,
  month: 'January',
  year: 2000,
};

export const personalInfo = { profileDescription: 'description', gender: 'gender', home: 'home', work: 'work' };

export const userData = {
  userData: {
    currentUser: {
      modifiedEmail: 'jacekkrajewski12wppl',
      profileImage: defaultUserImage,
      name: 'name name',
      followedUsersEmails: [],
      birthdayDate,
      personalInfo,
    },
    followedUsers: [],
    unfollowedUsers: [],
  },
};

export const currentUserNoPosts = {
  jacekkrajewski12wppl: {
    posts: {},
    totalPostsCreated: 0,
  },
};

export const currentUserPosts = {
  jacekkrajewski12wppl: {
    posts: {
      1: {
        creationTime: 1615988637142,
        index: 1,
        text: 'text1',
        hasUrl: false,
        url: null,
      },
    },
    totalPostsCreated: 1,
  },
};

export const anotherUserPosts = {
  testtestwppl: {
    posts: {
      1: {
        creationTime: 1615988637142,
        index: 1,
        name: 'testtestwppl',
        text: 'text2',
        hasUrl: false,
        url: null,
      },
    },
    totalPostsCreated: 1,
  },
};
