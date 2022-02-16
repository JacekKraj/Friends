import React from 'react';

import classes from './post.module.scss';
import PostHeader from './postHeader/PostHeader';
import PostContent from './postContent/PostContet';

const Post = (props) => {
  const { author, post } = props;

  return (
    <div className={classes.postComponent} data-test='post-component'>
      <PostHeader author={author} post={post} />
      <PostContent post={post} />
    </div>
  );
};

export default Post;
