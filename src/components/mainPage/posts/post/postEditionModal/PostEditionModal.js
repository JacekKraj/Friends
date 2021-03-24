import React from "react";

import classes from "./postEditionModal.module.scss";
import PostEditionModalOption from "./postEditionModalOption/PostEditionModalOption";

const PostEditionModal = (props) => {
  return (
    <div className={classes.postEditionModalComponent} data-test="component-post-edition-modal">
      <PostEditionModalOption text="Remove" testAttr="remove-btn" onClick={props.handleDelete} />
      <PostEditionModalOption text="Edit" />
    </div>
  );
};

export default PostEditionModal;
