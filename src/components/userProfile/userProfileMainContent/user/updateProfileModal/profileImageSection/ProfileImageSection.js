import React from 'react';
import { connect } from 'react-redux';

import classes from './profileImageSection.module.scss';
import * as actions from './../../../../../../actions/index';
import Button from './../../../../../UI/button/Button';
import FileInput from './../../../../../pagesComponents/imageFileInput/ImageFileInput';

const ProfileImageSection = ({ user, onSetUserImage }) => {
  const [newProfileImage, setNewProfileImage] = React.useState({ url: null });

  const onDropHandler = (image) => setNewProfileImage(image);

  const updateImage = () => {
    const isNewImageAdded = !!newProfileImage.url;
    if (isNewImageAdded) {
      onSetUserImage(newProfileImage, user.modifiedEmail);
    }
  };

  return (
    <div className={classes.profileImageSec}>
      <img className={classes.profileImage} src={newProfileImage.url || user.profileImage} alt='user profile image' />
      <div className={classes.profileImageButtons}>
        <FileInput onDropHandler={onDropHandler}>
          <Button className={classes.button} isTransparent>
            Choose new image
          </Button>
        </FileInput>
        <Button className={classes.button} isTransparent={false} onClick={updateImage}>
          Update image
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserImage: (image, userModifiedEmail) => dispatch(actions.setUserProfileImage(image, userModifiedEmail)),
  };
};

export default connect(null, mapDispatchToProps)(ProfileImageSection);