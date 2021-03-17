import React from "react";
import { connect } from "react-redux";

import classes from "./posts.module.scss";
import Post from "./post/Post";
import Spinner from "./../../UI/spinner/Spinner";

const Posts = (props) => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    if (props.posts) {
      const postsValues = Object.values(props.posts);
      postsValues.reverse();
      setPosts(
        postsValues.map((el) => {
          return <Post {...el} key={el.post.creationTime} />;
        })
      );
    }
  }, [props.posts]);

  return (
    <div className={classes.postsComponent}>
      {props.isLoading ? <Spinner /> : posts}
      {!props.isLoading && !posts.length && <p className={classes.noPostsInfo}>There are no posts to display.</p>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.posts.getPostsLoading,
  };
};

export default connect(mapStateToProps)(Posts);
