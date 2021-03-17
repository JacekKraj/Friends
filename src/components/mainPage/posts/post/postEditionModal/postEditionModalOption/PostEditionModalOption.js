import React from "react";

import classes from "./postEditionModalOption.module.scss";

const PostEditionModalOption = (props) => {
  return (
    <p className={classes.postEditionModalOptionComponent} onClick={props.onClick}>
      {props.text}
    </p>
  );
};

export default PostEditionModalOption;
