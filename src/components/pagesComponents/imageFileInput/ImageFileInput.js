import React from 'react';

import classes from './imageFileInput.module.scss';

const FileInput = ({ onDropHandler, children }) => {
  const acceptedImagesTypes = 'image/png, image/jpeg, image/gif, image/svg+xml, image/webp, image/apng, image/avif';

  const isFileSelected = (file) => !!file;

  const handleDropFile = React.useCallback((event) => {
    const droppedFile = event.target.files[0];

    if (!isFileSelected(droppedFile)) return;

    const image = Object.assign(droppedFile, {
      url: URL.createObjectURL(droppedFile),
    });

    onDropHandler(image);

    event.target.value = null;
  }, []);

  return (
    <div className={classes.fileInputComponent}>
      <input type='file' id='fileInput' className={classes.fileInput} accept={acceptedImagesTypes} onChange={handleDropFile} />
      <label htmlFor='fileInput'>{children}</label>
    </div>
  );
};

export default FileInput;
