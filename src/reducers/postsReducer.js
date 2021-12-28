import * as actionTypes from './../actions/actionsTypes';

const initialState = {
  usersPosts: {},
  isNewPostLoading: false,
  isGetPostsLoading: true,
  isUpdatePostLoading: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_POST:
      return {
        ...state,
        usersPosts: {
          ...state.usersPosts,
          [action.authorModifiedEmail]: {
            posts: {
              ...state.usersPosts[action.authorModifiedEmail]?.posts,
              [action.totalPostsCreated]: { ...action.post, index: action.totalPostsCreated },
            },
            totalPostsCreated: action.totalPostsCreated,
          },
        },
      };
    case actionTypes.SET_IS_NEW_POST_LOADING:
      return {
        ...state,
        isNewPostLoading: action.loading,
      };
    case actionTypes.GET_USERS_POSTS:
      return {
        ...state,
        usersPosts: { ...state.usersPosts, ...action.posts },
      };

    case actionTypes.SET_IS_GET_POSTS_LOADING:
      return {
        ...state,
        isGetPostsLoading: action.loading,
      };
    case actionTypes.REMOVE_POST:
      const newUserPosts = { ...state.usersPosts[action.user].posts };
      delete newUserPosts[action.index];
      return {
        ...state,
        usersPosts: {
          ...state.usersPosts,
          [action.user]: {
            ...state.usersPosts[action.user],
            posts: { ...newUserPosts },
          },
        },
      };
    case actionTypes.CLEAR_POSTS:
      return {
        ...state,
        usersPosts: {},
        isGetPostsLoading: true,
      };
    case actionTypes.UPDATE_POST:
      return {
        ...state,
        usersPosts: {
          ...state.usersPosts,
          [action.author]: {
            ...state.usersPosts[action.author],
            posts: {
              ...state.usersPosts[action.author].posts,
              [action.post.index]: { ...action.post },
            },
          },
        },
      };
    case actionTypes.SET_IS_UPDATE_POST_LOADING:
      return {
        ...state,
        isUpdatePostLoading: action.loading,
      };
    default:
      return state;
  }
};

export default postsReducer;
