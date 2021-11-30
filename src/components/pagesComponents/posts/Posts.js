import React from 'react';
import { connect } from 'react-redux';

import classes from './posts.module.scss';
import Post from './post/Post';
import Spinner from './../../UI/spinner/Spinner';

const Posts = (props) => {
  const { followedUsers, unfollowedUsers, currentUser, posts, isLoading } = props;

  const getAuthorData = (author) => {
    const usersToBrowseIn = [...followedUsers, ...unfollowedUsers, currentUser];
    const user = usersToBrowseIn.find((user) => {
      if (user.modifiedEmail === author.modifiedEmail) {
        return user;
      }
    });
    return user;
  };

  const getAuthorProfileImage = (author) => {
    const authorData = getAuthorData(author);
    const profileImage = authorData?.profileImage;
    return profileImage;
  };

  const buildPosts = posts?.map((post) => {
    const profileImage = getAuthorProfileImage(post.author);
    const author = { ...post.author, profileImage };
    return <Post author={author} post={post.post} key={post.post.creationTime} />;
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
    isLoading: state.posts.getPostsLoading,
    followedUsers: state.userData.followedUsers,
    unfollowedUsers: state.userData.unfollowedUsers,
    currentUser: state.userData.currentUser,
  };
};

export default connect(mapStateToProps)(Posts);
