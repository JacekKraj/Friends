import React from "react";

import classes from "./postEditionPanel.module.scss";
import PostEditionPanelOption from "./postEditionPanelOption/PostEditionPanelOption";

const PostEditionPanel = (props) => {
  return (
    <div className={classes.postEditionPanelComponent} data-test="component-post-edition-panel">
      <PostEditionPanelOption text="Remove" testAttr="remove-btn" onClick={props.handleDelete} />
      <PostEditionPanelOption text="Edit" onClick={props.handleEdit} />
    </div>
  );
};

export default PostEditionPanel;
