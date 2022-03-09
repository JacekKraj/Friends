import React from 'react';
import { useSelector } from 'react-redux';

import { useActions } from '../../../../../../utilities/hooks/useActions';
import classes from './profileImageSection.module.scss';
import Button from './../../../../../UI/button/Button';
import FileInput from './../../../../../pagesComponents/imageFileInput/ImageFileInput';

const ProfileImageSection = () => {
  const { profileImage } = useSelector((state) => state.userData.currentUser);
  const { setUserProfileImage } = useActions();

  const [newProfileImage, setNewProfileImage] = React.useState({ url: null });

  const onDropHandler = (image) => setNewProfileImage(image);

  const updateImage = () => {
    const isNewImageAdded = !!newProfileImage.url;
    if (isNewImageAdded) {
      setUserProfileImage(newProfileImage);
    }
  };

  return (
    <div className={classes.profileImageSec}>
      <img className={classes.profileImage} src={newProfileImage.url || profileImage} alt='user profile image' data-test='profile-image' />
      <div className={classes.profileImageButtons}>
        <FileInput onDropHandler={onDropHandler}>
          <Button className={classes.button} isTransparent>
            Choose new image
          </Button>
        </FileInput>
        <Button className={classes.button} isTransparent={false} onClick={updateImage} testData='profile-image-update-button'>
          Update image
        </Button>
      </div>
    </div>
  );
};

export default ProfileImageSection;
