import React from "react";

import classes from "./fileInput.module.scss";

const FileInput = (props) => {
  return (
    <div className={classes.fileInputComponent}>
      <input
        type="file"
        id="fileInput"
        className={classes.fileInput}
        accept="image/png, image/jpeg"
        onChange={(event) => {
          props.handleDrop(event);
        }}
      />
      <label htmlFor="fileInput">{props.children}</label>
    </div>
  );
};

export default FileInput;
