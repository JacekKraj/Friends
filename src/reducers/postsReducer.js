import * as actionTypes from "./../actions/actionsTypes";

const initialState = {
  usersPosts: {},
  newPostLoading: false,
  getPostsLoading: true,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_POST:
      return {
        ...state,
        usersPosts: {
          ...state.usersPosts,
          [action.post.author.modifiedEmail]: {
            posts: { ...state.usersPosts[action.post.author.modifiedEmail]?.posts, [action.totalPostsCreated]: { ...action.post } },
            totalPostsCreated: action.totalPostsCreated,
          },
        },
      };
    case actionTypes.SET_NEW_POST_LOADING:
      return {
        ...state,
        newPostLoading: action.loading,
      };
    case actionTypes.GET_USERS_POSTS:
      return {
        ...state,
        usersPosts: { ...state.usersPosts, ...action.posts },
      };

    case actionTypes.SET_GET_POSTS_LOADING:
      return {
        ...state,
        getPostsLoading: action.loading,
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
        getPostsLoading: true,
      };
    default:
      return state;
  }
};

export default postsReducer;
