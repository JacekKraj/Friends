import React from "react";

import classes from "./postEditionModalOption.module.scss";

const PostEditionModalOption = (props) => {
  return (
    <button type="button" className={classes.postEditionModalOptionComponent} onClick={props.onClick} data-test={props.testAttr}>
      {props.text}
    </button>
  );
};

export default PostEditionModalOption;
