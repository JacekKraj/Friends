import React from "react";
import { connect } from "react-redux";

import classes from "./posts.module.scss";
import Post from "./post/Post";
import Spinner from "./../../UI/spinner/Spinner";

const Posts = (props) => {
  const posts = props.posts.map((el) => {
    return <Post {...el} key={el.post.creationTime} />;
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
  };
};

export default connect(mapStateToProps)(Posts);
