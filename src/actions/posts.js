import fire from './../firebaseConfig';

import * as actionTypes from './actionsTypes';
import { failToast, successToast } from './../utilities/toasts/toasts';

export const setIsNewPostLoading = (loading) => {
  return {
    type: actionTypes.SET_IS_NEW_POST_LOADING,
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

export const addUserPost = (postData, clearPost) => {
  const { post, author, totalPostsCreatedAmount } = postData;

  const finishAddingPost = (dispatch, newPost) => {
    dispatch(createUserPost(newPost, totalPostsCreatedAmount));
    clearPost();
    dispatch(setIsNewPostLoading(false));
  };

  return async (dispatch) => {
    dispatch(setIsNewPostLoading(true));

    const newPost = {
      post: { text: post.text, url: post.url, creationTime: post.creationTime, index: totalPostsCreatedAmount },
      author: { modifiedEmail: author.modifiedEmail, name: author.name },
    };

    const updates = {};
    updates[`users/${author.modifiedEmail}/posts/posts/${totalPostsCreatedAmount}`] = newPost;
    updates[`users/${author.modifiedEmail}/posts/totalPostsCreated`] = totalPostsCreatedAmount;

    try {
      await fire.database().ref().update(updates);

      if (post.image.url) {
        await fire.storage().ref(`users/${author.modifiedEmail}/posts/${totalPostsCreatedAmount}`).put(post.image);
      }

      finishAddingPost(dispatch, newPost);
    } catch (error) {
      failToast(error.message);
      dispatch(setIsNewPostLoading(false));
    }
  };
};

export const setIsGetPostsLoading = (loading) => {
  return {
    type: actionTypes.SET_IS_GET_POSTS_LOADING,
    loading,
  };
};

const setUsersPosts = (posts) => {
  return {
    type: actionTypes.GET_USERS_POSTS,
    posts,
  };
};

const getPostsSnapshotFromFirebase = (modifiedEmail) => {
  const snapshot = fire.database().ref(`users/${modifiedEmail}/posts`).get();

  return snapshot;
};

const postsAreExisting = (snapshot) => {
  return snapshot.val() && snapshot.val().posts;
};

const buildPostsArray = (snapshot) => {
  let posts = snapshot.val().posts;

  if (!Array.isArray(posts)) {
    posts = Object.values(posts);
  }

  posts = posts.filter((post) => post);

  return posts;
};

const getPostURL = (post) => {
  return new Promise(async (resolve) => {
    let url;

    try {
      url = await fire.storage().ref(`users/${post.author.modifiedEmail}/posts/${post.post.index}`).getDownloadURL();
    } catch (_) {
      url = null;
    }

    resolve(url);
  });
};

const appendUrlsToPosts = (posts, urls) => {
  const postsWithUrls = posts.map((post, index) => {
    return { ...post, post: { ...post.post, url: urls[index] } };
  });

  return postsWithUrls;
};

const getPostsWithImages = async (posts) => {
  const urls = await Promise.all(posts.map((postWithoutURL) => getPostURL(postWithoutURL)));

  const postsWithImages = appendUrlsToPosts(posts, urls);

  return postsWithImages;
};

const getPostsObject = (postsArray) => {
  const postsObject = postsArray.reduce((previousPosts, currentPost) => {
    return { ...previousPosts, [currentPost.post.index]: currentPost };
  }, {});

  return postsObject;
};

export const getUserPosts = (modifiedEmail, resolve) => {
  return async (dispatch) => {
    if (!modifiedEmail) {
      return;
    }

    try {
      const snapshot = await getPostsSnapshotFromFirebase(modifiedEmail);

      if (!postsAreExisting(snapshot)) {
        const userPosts = { [modifiedEmail]: { totalPostsCreated: 0, posts: {} } };

        dispatch(setUsersPosts(userPosts));
        resolve(userPosts);

        return;
      }

      const postsArray = buildPostsArray(snapshot);

      const postsWithImages = await getPostsWithImages(postsArray);

      const postsObject = getPostsObject(postsWithImages);

      const totalPostsCreated = snapshot.val().totalPostsCreated;

      const userPosts = { [modifiedEmail]: { totalPostsCreated, posts: postsObject } };

      dispatch(setUsersPosts(userPosts));
      resolve(userPosts);
    } catch (error) {
      failToast(error.message);
      dispatch(setIsGetPostsLoading(false));
    }
  };
};

export const removePost = (post) => {
  const { index, authorModifiedEmail, hasUrl } = post;

  return async (dispatch) => {
    const updates = {};
    updates[`users/${authorModifiedEmail}/posts/posts/${index}`] = null;

    try {
      await fire.database().ref().update(updates);

      hasUrl && (await fire.storage().ref(`users/${authorModifiedEmail}/posts/${index}`).delete());

      dispatch({ type: actionTypes.REMOVE_POST, user: authorModifiedEmail, index });
    } catch (error) {
      failToast(error.message);
    }
  };
};

export const clearPosts = () => {
  return {
    type: actionTypes.CLEAR_POSTS,
  };
};

export const setIsUpdatePostLoading = (loading) => {
  return {
    type: actionTypes.SET_IS_UPDATE_POST_LOADING,
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

export const updatePost = (updatedPostData, hideModal) => {
  const { author, post, previousUrl } = updatedPostData;

  const updates = {};
  updates[`users/${author.modifiedEmail}/posts/posts/${post.index}`] = { author, post: { ...post, image: null } };
  const storageRef = fire.storage().ref(`users/${author.modifiedEmail}/posts/${post.index}`);

  return async (dispatch) => {
    const finishUpdate = () => {
      dispatch(setUpdatedPost(author, post));
      hideModal();
      dispatch(setIsUpdatePostLoading(false));
      successToast('Your post has been updated.');
    };

    dispatch(setIsUpdatePostLoading(true));

    try {
      await fire.database().ref().update(updates);

      if (post.image.url === null && previousUrl !== null) {
        await storageRef.delete();
      } else if (post.image.url !== previousUrl) {
        await storageRef.put(post.image);
      }

      finishUpdate();
    } catch (error) {
      failToast(error.message);
    }
  };
};
