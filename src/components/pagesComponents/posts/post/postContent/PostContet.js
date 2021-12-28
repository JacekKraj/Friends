import React from 'react';

import classes from './postContent.module.scss';

const PostContent = ({ post }) => {
  return (
    <div>
      <p className={classes.text} data-test='text'>
        {post.text}
      </p>
      {post.hasUrl && <img src={post.url} className={classes.postImage} data-test='post-image' alt='post picture' />}
    </div>
  );
};

export default PostContent;
