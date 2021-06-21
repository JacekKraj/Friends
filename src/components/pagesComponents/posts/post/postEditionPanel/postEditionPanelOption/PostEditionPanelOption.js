import React from "react";

import classes from "./postEditionPanelOption.module.scss";

const PostEditionPanelOption = (props) => {
  return (
    <button type="button" className={classes.postEditionPanelOptionComponent} onClick={props.onClick} data-test={props.testAttr}>
      {props.text}
    </button>
  );
};

export default PostEditionPanelOption;
