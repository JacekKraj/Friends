import React from "react";

import classes from "./postEditionModal.module.scss";
import PostEditionModalOption from "./postEditionModalOption/PostEditionModalOption";

const PostEditionModal = (props) => {
  return (
    <div className={classes.postEditionModalComponent}>
      <PostEditionModalOption text="Remove" onClick={props.handleDelete} />
      <PostEditionModalOption text="Edit" />
    </div>
  );
};

export default PostEditionModal;
