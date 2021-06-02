import React from "react";
import { connect } from "react-redux";

import classes from "./posts.module.scss";
import Post from "./post/Post";
import Spinner from "./../../UI/spinner/Spinner";

const Posts = (props) => {
  const getAuthorProfileImage = (author) => {
    let profileImage = null;

    [...props.followedUsers, ...props.unfollowedUsers].forEach((el) => {
      if (el.modifiedEmail === author.modifiedEmail) {
        profileImage = el.profileImage;
        return;
      }
    });
    profileImage = profileImage || props.currentUserProfileImage;
    return profileImage;
  };

  const posts = props.posts.map((el) => {
    const profileImage = getAuthorProfileImage(el.author);
    return <Post {...el} profileImage={profileImage} key={el.post.creationTime} />;
  });

  return (
    <div className={classes.postsComponent}>
      {props.isLoading ? <Spinner /> : posts}
      {!props.isLoading && !posts.length && (
        <p className={classes.noPostsInfo} data-test="no-posts-info">
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
    currentUserProfileImage: state.userData.currentUser.profileImage,
  };
};

export default connect(mapStateToProps)(Posts);
