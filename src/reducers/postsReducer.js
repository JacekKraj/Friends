import * as actionTypes from "./../actions/actionsTypes";

const initialState = {
  userPosts: [],
  loading: false,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST:
      return {
        ...state,
        userPosts: [...state.userPosts, { text: action.text, img: action.img, creationTime: action.creationTime }],
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default postsReducer;
