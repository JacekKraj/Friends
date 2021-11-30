import fire from './../firebaseConfig';

import * as actionTypes from './actionsTypes';
import { failToast, successToast } from './../utilities/toasts/toasts';

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
      post: { text: post.text, url: post.url, creationTime: post.creationTime, index: totalPostsCreated },
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
        if (post.image.url) {
          fire
            .storage()
            .ref(`users/${author.modifiedEmail}/posts/${totalPostsCreated}`)
            .put(post.image)
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

const getPostURL = (el) => {
  return new Promise((resolve) => {
    fire
      .storage()
      .ref(`users/${el.author.modifiedEmail}/posts/${el.post.index}`)
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

export const getUsersPosts = (modifiedEmail, resolve) => {
  const createPosts = (dispatch, email, tpc, posts = {}) => {
    const userPosts = { [email]: { totalPostsCreated: tpc, posts } };
    dispatch(setUsersPosts(userPosts));
    resolve(userPosts);
  };
  return (dispatch) => {
    if (modifiedEmail) {
      fire
        .database()
        .ref(`users/${modifiedEmail}/posts`)
        .get()
        .then((snapshot) => {
          if (snapshot.val() && snapshot.val().posts) {
            let posts = snapshot.val().posts;
            if (!Array.isArray(posts)) {
              posts = Object.values(posts);
            }
            Promise.all(posts.map((postWithoutURL) => getPostURL(postWithoutURL)))
              .then((results) => {
                let resultsModified = {};
                results.forEach((post) => {
                  if (post) {
                    resultsModified = { ...resultsModified, [post.post.index]: post };
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

export const removePost = (index, user, isUrl) => {
  return (dispatch) => {
    const updates = {};
    updates[`users/${user}/posts/posts/${index}`] = null;
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        if (isUrl) {
          fire.storage().ref(`users/${user}/posts/${index}`).delete();
        }
      })
      .catch((error) => {
        failToast(error.message);
      });
    dispatch({ type: actionTypes.REMOVE_POST, user, index });
  };
};

export const clearPosts = () => {
  return {
    type: actionTypes.CLEAR_POSTS,
  };
};

export const setUpdatePostLoading = (loading) => {
  return {
    type: actionTypes.SET_UPDATE_POST_LOADING,
    loading,
  };
};

export const setUpdatedPost = (author, post) => {
  return {
    type: actionTypes.UPDATE_POST,
    author,
    post,
  };
};

export const updatePost = (author, post, previousUrl, hideModal) => {
  const updates = {};
  updates[`users/${author.modifiedEmail}/posts/posts/${post.index}`] = { author, post: { ...post, image: null } };
  const storageRef = fire.storage().ref(`users/${author.modifiedEmail}/posts/${post.index}`);

  return (dispatch) => {
    const finishUpdate = () => {
      dispatch(setUpdatedPost(author, post));
      hideModal();
      dispatch(setUpdatePostLoading(false));
      successToast('Your post has been updated.');
    };
    dispatch(setUpdatePostLoading(true));
    fire
      .database()
      .ref()
      .update(updates)
      .then(() => {
        if (post.image.url !== previousUrl && post.image.url !== null) {
          storageRef.put(post.image).then(() => {
            finishUpdate();
          });
        } else if (post.image.url === previousUrl) {
          finishUpdate();
        } else {
          storageRef.delete().then(() => {
            finishUpdate();
          });
        }
      })
      .catch((error) => {
        failToast(error.message);
      });
  };
};
