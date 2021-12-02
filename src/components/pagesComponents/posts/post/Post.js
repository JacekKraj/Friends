import React from 'react';

import classes from './post.module.scss';
import PostEditionModal from './postEditionModal/PostEditionModal';
import PostHeader from './postHeader/PostHeader';
import PostContent from './postContent/PostContet';

const Post = (props) => {
  const { author, post } = props;

  const [isEditionModalShown, setIsEditionModalShown] = React.useState(false);

  return (
    <React.Fragment>
      {isEditionModalShown && <PostEditionModal author={author} post={post} handleBackdropClick={() => setIsEditionModalShown(false)} />}
      <div className={classes.postComponent} data-test='post-component'>
        <PostHeader author={author} post={post} setIsEditionModalShown={setIsEditionModalShown} />
        <PostContent post={post} />
      </div>
    </React.Fragment>
  );
};

export default Post;
