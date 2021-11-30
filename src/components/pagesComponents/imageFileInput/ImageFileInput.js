import React from 'react';

import classes from './imageFileInput.module.scss';

const FileInput = ({ onDropHandler, children }) => {
  const isFileSelected = (file) => !!file;

  const handleDropFile = React.useCallback((event) => {
    const droppedFile = event.target.files[0];

    if (!isFileSelected(droppedFile)) return;

    const image = Object.assign(droppedFile, {
      url: URL.createObjectURL(droppedFile),
    });

    onDropHandler(image);
  }, []);

  return (
    <div className={classes.fileInputComponent}>
      <input type='file' id='fileInput' className={classes.fileInput} accept='image/png, image/jpeg' onChange={handleDropFile} />
      <label htmlFor='fileInput'>{children}</label>
    </div>
  );
};

export default FileInput;
