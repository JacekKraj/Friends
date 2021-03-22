import fire from "./../firebaseConfig";

import * as actionTypes from "./actionsTypes";
import { failToast } from "./../utilities/toasts/toasts";

export const setNewPostLoading = (loading) => {
  return {
    type: actionTypes.SET_NEW_POST_LOADING,
    loading,
  };
};

export const createUserPost = (post, tpc) => {
  return {
    type: actionTypes.ADD_USER_POST,
    post: {
      ...post,
    },
    totalPostsCreated: tpc,
  };
};

export const addUserPost = (post, author, clearPost, totalPostsCreated) => {
  const createPost = (dispatch, newPost) => {
    dispatch(setNewPostLoading(false));
    dispatch(createUserPost(newPost, totalPostsCreated));
    clearPost();
  };
  return (dispatch) => {
    dispatch(setNewPostLoading(true));
    const newPost = {
      post: { text: post.text, url: post.url, creationTime: post.creationTime, index: totalPostsCreated, type: post.type, name: post.name },
      author: { modifiedEmail: author.modifiedEmail, name: author.name },
    };
    const updates = {};
    updates[`users/${author.modifiedEmail}/posts/posts/${totalPostsCreated}`] = newPost;
    updates[`users/${author.modifiedEmail}/posts/totalPostsCreated`] = totalPostsCreated;
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        if (post.img.preview) {
          fire
            .storage()
            .ref(`users/${author.modifiedEmail}/posts/${totalPostsCreated}`)
            .put(post.img)
            .then(() => {
              createPost(dispatch, newPost);
            });
        } else {
          createPost(dispatch, newPost);
        }
      })
      .catch((error) => {
        dispatch(setNewPostLoading(false));
        failToast(error.message);
      });
  };
};

export const setGetPostsLoading = (loading) => {
  return {
    type: actionTypes.SET_GET_POSTS_LOADING,
    loading,
  };
};

const getPostURL = (path, el) => {
  return new Promise((resolve) => {
    fire
      .storage()
      .ref(`${path}/posts/${el.post.index}`)
      .getDownloadURL()
      .then((url) => {
        resolve({ ...el, post: { ...el.post, url } });
      })
      .catch(() => {
        resolve({ ...el, post: { ...el.post, url: null } });
      });
  });
};

const setUsersPosts = (posts) => {
  return {
    type: actionTypes.GET_USERS_POSTS,
    posts,
  };
};

export const getUsersPosts = (modifiedEmail) => {
  const createPosts = (dispatch, email, tpc, posts = {}) => {
    const userPosts = { [email]: { totalPostsCreated: tpc, posts } };
    dispatch(setGetPostsLoading(false));
    dispatch(setUsersPosts(userPosts));
  };
  return (dispatch) => {
    if (modifiedEmail) {
      dispatch(setGetPostsLoading(true));
      fire
        .database()
        .ref(`users/${modifiedEmail}/posts`)
        .get()
        .then((snapshot) => {
          if (snapshot.val()) {
            let posts = snapshot.val().posts ? snapshot.val().posts : [];
            if (snapshot.val().posts) {
              if (!Array.isArray(snapshot.val().posts)) {
                posts = Array.from(Object.values(snapshot.val().posts));
              }
            }
            Promise.all(posts.map((el) => getPostURL(`users/${modifiedEmail}`, el)))
              .then((results) => {
                let resultsModified = {};
                results.forEach((el) => {
                  if (el) {
                    resultsModified = { ...resultsModified, [el.post.index]: el };
                  }
                });
                createPosts(dispatch, modifiedEmail, snapshot.val().totalPostsCreated, resultsModified);
              })
              .catch((error) => {
                failToast(error.message);
              });
          } else {
            createPosts(dispatch, modifiedEmail, 0);
          }
        })
        .catch((error) => {
          failToast(error.message);
          dispatch(setGetPostsLoading(false));
        });
    }
  };
};

export const removePost = (type, name, index) => {
  return (dispatch) => {
    const updates = {};
    updates[`${type}/${name}/posts/posts/${index}`] = null;
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        fire.storage().ref(`${type}/${name}/posts/${index}`).delete();
      })
      .catch((error) => {
        failToast(error.message);
      });
    dispatch({ type: actionTypes.REMOVE_POST, postType: `${type}Posts`, name, index });
  };
};
