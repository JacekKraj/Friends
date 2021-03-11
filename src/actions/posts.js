import fire from "./../firebaseConfig";

import * as actionTypes from "./actionsTypes";
import { failToast } from "./../utilities/toasts/toasts";

export const setLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING,
    loading,
  };
};

const createUserPost = (text, img, creationTime, clearPostAfterSuccess) => {
  clearPostAfterSuccess();
  return {
    type: actionTypes.ADD_POST,
    text,
    img,
    creationTime,
  };
};

export const addUserPost = (text, img = null, user, userPosts, creationTime, clearPostAfterSuccess) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    const index = userPosts.length;
    fire
      .database()
      .ref(`users/${user}/posts`)
      .set([...userPosts, { text, creationTime, index }])
      .then(() => {
        fire
          .storage()
          .ref(`users/${user}/posts/${index}`)
          .put(img)
          .then(() => {
            dispatch(setLoading(false));
            dispatch(createUserPost(text, img, creationTime, clearPostAfterSuccess));
          });
      })
      .catch((error) => {
        dispatch(setLoading(false));
        failToast(error.message);
      });
  };
};
