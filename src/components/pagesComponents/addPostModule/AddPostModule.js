import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { useActions } from '../../../utilities/hooks/useActions';
import { breakpoints } from './../../../utilities/breakpoints/breakpoints';
import EmojiPicker from './../../../utilities/emojiPicker/EmojiPicker';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoIcon from '@material-ui/icons/Photo';
import classes from './addPostModule.module.scss';
import Button from './../../UI/button/Button';
import FileInput from '../imageFileInput/ImageFileInput';
import SpinnerContainer from './../../../utilities/spinnerContainer/SpinnerContainer';

const { tabletVertical, mobileHorizontal, laptopSm, tabletHorizontal } = breakpoints;

export const useStyles = makeStyles(() => ({
  addPhoto: {
    cursor: 'pointer',
    color: '#0eb611',
    width: 28,
    height: 28,
    [tabletVertical]: {
      width: 35,
      height: 35,
    },
    [mobileHorizontal]: {
      width: 28,
      height: 28,
    },
    [laptopSm]: {
      width: 30,
      height: 30,
    },
  },
  removePhoto: {
    cursor: 'pointer',
    position: 'absolute',
    backgroundColor: 'rgb(252,252,252)',
    color: '#333',
    borderRadius: '50%',
    padding: '0.5%',
    top: '1%',
    right: '1%',
    width: 24,
    height: 24,
    [tabletVertical]: {
      width: 38,
      height: 38,
    },

    [mobileHorizontal]: {
      width: 25,
      height: 25,
      top: '1.5%',
      right: '1%',
    },

    [tabletHorizontal]: {
      width: 27,
      height: 27,
      padding: '0.3%',
      top: '2%',
      right: '1%',
    },

    [laptopSm]: {
      width: 32,
      height: 32,
    },
  },
}));

export const UnconnectedAddPostModule = () => {
  const SET_IMAGE = 'SET_IMAGE';
  const SET_TEXT = 'SET_TEXT';
  const SET_CURSOR_POSITION = 'SET_CURSOR_POSITION';

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_IMAGE:
        return {
          ...state,
          image: action.image,
        };
      case SET_TEXT:
        return {
          ...state,
          text: action.text,
        };
      case SET_CURSOR_POSITION:
        return {
          ...state,
          cursorPosition: action.cursorPosition,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(reducer, { image: { url: null }, text: '', cursorPosition: 0 });

  const textAreaRef = React.useRef();

  const iconStyle = useStyles();

  const { usersPosts, isNewPostLoading } = useSelector((state) => state.posts);
  const { modifiedEmail } = useSelector((state) => state.userData.currentUser);

  const { addUserPost } = useActions();

  React.useEffect(() => {
    textAreaRef.current.selectionEnd = state.cursorPosition;
  }, [state.cursorPosition]);

  const removePhoto = () => {
    dispatch({ type: SET_IMAGE, image: { url: null } });
  };

  const clearModuleAfterAddingPost = () => {
    removePhoto();
    dispatch({ type: SET_TEXT, text: '' });
  };

  const changeInputValue = (value) => {
    dispatch({ type: SET_TEXT, text: value });
  };

  const setImage = (image) => {
    dispatch({ type: SET_IMAGE, image });
  };

  const getPostCreationTime = () => {
    const date = new Date();
    const creationTime = date.getTime();
    return creationTime;
  };

  const getPostImage = () => {
    const image = state.image || { url: null };
    return image;
  };

  const buildPost = () => {
    const image = getPostImage();
    const creationTime = getPostCreationTime();

    const post = {
      creationTime,
      text: state.text,
      image,
    };

    return post;
  };

  const countTotalPostsCreatedByUserAmount = () => {
    const currentCreatedPostsAmount = usersPosts[modifiedEmail].totalPostsCreated;

    const newCreatedPostsAmount = currentCreatedPostsAmount !== 0 ? currentCreatedPostsAmount + 1 : 1;

    return newCreatedPostsAmount;
  };

  const submitPost = () => {
    const post = buildPost();

    const totalPostsCreatedAmount = countTotalPostsCreatedByUserAmount();

    addUserPost({ post, totalPostsCreatedAmount }, clearModuleAfterAddingPost);
  };

  return (
    <div className={classes.addPostModuleComponent} data-test='add-post-module-component'>
      {isNewPostLoading && <SpinnerContainer />}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitPost();
        }}
        data-test='add-post-module-form'
      >
        <textarea
          className={classes.textarea}
          value={state.text}
          ref={textAreaRef}
          required
          onChange={(e) => {
            changeInputValue(e.target.value);
          }}
          placeholder='What are you thinking about?'
          data-test='add-post-module-textarea'
        />
        {state.image.url && (
          <div className={classes.photoPreviewContainer}>
            <ClearIcon className={iconStyle.removePhoto} onClick={removePhoto} data-test='remove-image-btn' />
            <img src={state.image.url} className={classes.photoPreview} data-test='image' />
          </div>
        )}
        <div className={classes.addPostModulBottomBar}>
          <div className={classes.iconsContainer}>
            <FileInput onDropHandler={setImage}>
              <PhotoIcon className={iconStyle.addPhoto} />
            </FileInput>
            <EmojiPicker
              setCursorPosition={(position) => dispatch({ type: SET_CURSOR_POSITION, cursorPosition: position })}
              input={{ value: state.text, ref: textAreaRef, changeValue: changeInputValue }}
            />
          </div>
          <Button className={classes.button}>Post</Button>
        </div>
      </form>
    </div>
  );
};

export default UnconnectedAddPostModule;
