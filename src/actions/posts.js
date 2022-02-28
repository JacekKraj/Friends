import { fire } from './../firebaseConfig';
import * as actions from './index';
import * as actionTypes from './actionsTypes';
import { failToast, successToast } from './../utilities/toasts/toasts';

export const setIsNewPostLoading = (loading) => {
  return {
    type: actionTypes.SET_IS_NEW_POST_LOADING,
    loading,
  };
};

export const createUserPost = (post, authorModifiedEmail, totalPostsCreated) => {
  return {
    type: actionTypes.ADD_USER_POST,
    post,
    authorModifiedEmail,
    totalPostsCreated,
  };
};

export const addUserPost = (postData, clearPost) => {
  const { post, totalPostsCreatedAmount } = postData;

  return async (dispatch, getState) => {
    dispatch(setIsNewPostLoading(true));

    const { modifiedEmail } = getState().userData.currentUser;

    const newPost = {
      ...post,
      hasUrl: !!post.image.url,
    };

    delete newPost.image;

    const updates = {};
    updates[`users/${modifiedEmail}/posts/posts/${totalPostsCreatedAmount}`] = newPost;
    updates[`users/${modifiedEmail}/posts/totalPostsCreated`] = totalPostsCreatedAmount;

    try {
      await fire.database().ref().update(updates);

      if (post.image.url) {
        await fire.storage().ref(`users/${modifiedEmail}/posts/${totalPostsCreatedAmount}`).put(post.image);
      }

      dispatch(createUserPost({ ...newPost, url: post.image.url }, modifiedEmail, totalPostsCreatedAmount));
      clearPost();
    } catch (error) {
      failToast(error.message);
    }

    dispatch(setIsNewPostLoading(false));
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
    type: actionTypes.SET_USERS_POSTS,
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

const appendIndexesToPosts = (posts) => {
  let postsWithIndexes = {};

  for (let index in posts) {
    postsWithIndexes = { ...postsWithIndexes, [index]: { index, ...posts[index] } };
  }

  return postsWithIndexes;
};

const buildPostsArray = (snapshot) => {
  let postsWithIndexes = appendIndexesToPosts(snapshot.val().posts);

  if (!Array.isArray(postsWithIndexes)) {
    postsWithIndexes = Object.values(postsWithIndexes);
  }

  postsWithIndexes = postsWithIndexes.filter((post) => post);

  return postsWithIndexes;
};

const getPostURL = (post, authorModifiedEmail) => {
  return new Promise(async (resolve) => {
    let url;

    try {
      url = post.hasUrl ? await fire.storage().ref(`users/${authorModifiedEmail}/posts/${post.index}`).getDownloadURL() : null;
    } catch (_) {
      url = null;
    }

    resolve(url);
  });
};

const appendUrlsToPosts = (posts, urls) => {
  const postsWithUrls = posts.map((post, index) => {
    return { ...post, url: urls[index] };
  });

  return postsWithUrls;
};

const getPostsWithImages = async (posts, authorModifiedEmail) => {
  const urls = await Promise.all(posts.map((postWithoutURL) => getPostURL(postWithoutURL, authorModifiedEmail)));

  const postsWithImages = appendUrlsToPosts(posts, urls);

  return postsWithImages;
};

const getPostsObject = (postsArray) => {
  const postsObject = postsArray.reduce((previousPosts, currentPost) => {
    return { ...previousPosts, [currentPost.index]: currentPost };
  }, {});

  return postsObject;
};

export const downloadUserPosts = (modifiedEmail, resolve) => {
  return async (dispatch) => {
    if (!modifiedEmail) return;

    try {
      const snapshot = await getPostsSnapshotFromFirebase(modifiedEmail);

      if (!postsAreExisting(snapshot)) {
        const userPosts = { [modifiedEmail]: { totalPostsCreated: 0, posts: {} } };

        dispatch(setUsersPosts(userPosts));
        resolve();

        return;
      }

      const postsArray = buildPostsArray(snapshot);

      const postsWithImages = await getPostsWithImages(postsArray, modifiedEmail);

      const postsObject = getPostsObject(postsWithImages);

      const totalPostsCreated = snapshot.val().totalPostsCreated;

      const userPosts = { [modifiedEmail]: { totalPostsCreated, posts: postsObject } };

      dispatch(setUsersPosts(userPosts));
      resolve();
    } catch (error) {
      failToast(error.message);
      dispatch(setIsGetPostsLoading(false));
    }
  };
};

export const removePost = (post) => {
  const { index, hasUrl } = post;

  return async (dispatch, getState) => {
    const { modifiedEmail } = getState().userData.currentUser;

    const updates = {};
    updates[`users/${modifiedEmail}/posts/posts/${index}`] = null;

    try {
      await fire.database().ref().update(updates);

      hasUrl && (await fire.storage().ref(`users/${modifiedEmail}/posts/${index}`).delete());

      dispatch({ type: actionTypes.REMOVE_POST, user: modifiedEmail, index });
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

export const setUpdatedPost = (post, author) => {
  return {
    type: actionTypes.UPDATE_POST,
    post,
    author,
  };
};

export const updatePost = (updatedPostData) => {
  const { post, previousUrl } = updatedPostData;

  const updatedPost = {
    hasUrl: !!post.image.url,
    creationTime: post.creationTime,
    text: post.text,
  };

  const updates = {};
  updates[`users/${post.author}/posts/posts/${post.index}`] = updatedPost;
  const storageRef = fire.storage().ref(`users/${post.author}/posts/${post.index}`);

  return async (dispatch) => {
    const finishUpdate = () => {
      dispatch(setUpdatedPost({ ...updatedPost, url: post.image.url, index: post.index }, post.author));
      dispatch(actions.hideModal());
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
