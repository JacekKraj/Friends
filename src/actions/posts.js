import fire from "./../firebaseConfig";

import * as actionTypes from "./actionsTypes";
import { failToast } from "./../utilities/toasts/toasts";

const setLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING,
    loading,
  };
};

const createPost = (text, img, creationTime) => {
  return {
    type: actionTypes.ADD_POST,
    text,
    img,
    creationTime,
  };
};

export const addPost = (text, img = null, user, userPosts, creationTime) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fire
      .database()
      .ref(`users/${user}/posts`)
      .set([...userPosts, { text, img, creationTime }])
      .then(() => {
        dispatch(setLoading(false));
        dispatch(createPost(text, img, creationTime));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        failToast(error.message);
      });
  };
};
