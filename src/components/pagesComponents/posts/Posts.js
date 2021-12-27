import React from 'react';
import { connect } from 'react-redux';

import classes from './posts.module.scss';
import Post from './post/Post';
import Spinner from './../../UI/spinner/Spinner';

const Posts = (props) => {
  const { followedUsers, unfollowedUsers, currentUser, posts, isLoading } = props;

  const getRelevantAuthorData = (author) => {
    const usersToBrowseIn = [...followedUsers, ...unfollowedUsers, currentUser];

    const authorData = usersToBrowseIn.find((user) => {
      if (user.modifiedEmail === author) {
        return user;
      }
    });

    const { profileImage, name } = authorData;

    const relevantAuthorData = {
      profileImage,
      name,
    };

    return relevantAuthorData;
  };

  const buildPosts = posts?.map((post) => {
    const relevantAuthorData = getRelevantAuthorData(post.author);
    const author = { modifiedEmail: post.author, ...relevantAuthorData };
    return <Post author={author} post={post} key={post.creationTime} />;
  });

  const postsAreNotFound = !isLoading && !posts?.length;

  return (
    <div className={classes.postsComponent}>
      {isLoading ? <Spinner /> : buildPosts}
      {postsAreNotFound && (
        <p className={classes.noPostsInfo} data-test='no-posts-info'>
          There are no posts to display.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.posts.isGetPostsLoading,
    followedUsers: state.userData.followedUsers,
    unfollowedUsers: state.userData.unfollowedUsers,
    currentUser: state.userData.currentUser,
  };
};

export default connect(mapStateToProps)(Posts);
