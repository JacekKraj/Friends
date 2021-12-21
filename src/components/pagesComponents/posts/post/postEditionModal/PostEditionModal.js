import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoIcon from '@material-ui/icons/Photo';
import { connect } from 'react-redux';
import { useStyles } from './../../../addPostModule/AddPostModule';

import classes from './postEditionModal.module.scss';
import Backdrop from './../../../../UI/backdrop/Backdrop';
import Button from './../../../../UI/button/Button';
import FileInput from '../../../imageFileInput/ImageFileInput';
import * as actions from './../../../../../actions/index';
import SpinnerContainer from './../../../../../utilities/spinnerContainer/SpinnerContainer';
import EmojiPicker from './../../../../../utilities/emojiPicker/EmojiPicker';

const SET_TEXT = 'SET_TEXT';
const SET_IMAGE = 'SET_IMAGE';
const SET_CURSOR_POSITION = 'SET_CURSOR_POSITION';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        text: action.text,
        textChanged: action.changed,
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.image,
        imageChanged: true,
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

const PostEditionModal = (props) => {
  const { post, author, onUpdatePost, isLoading, handleBackdropClick } = props;

  const iconStyle = useStyles();

  const [state, dispatch] = React.useReducer(reducer, {
    image: { url: post.url },
    text: post.text,
    textChanged: false,
    imageChanged: false,
    cursorPosition: 0,
  });

  const textAreaRef = React.useRef();

  React.useEffect(() => {
    textAreaRef.current.selectionEnd = state.cursorPosition;
  }, [state.cursorPosition]);

  React.useEffect(() => {
    textAreaRef.current.selectionStart = post.text.length;
  }, [post.text.length]);

  const setImage = (image) => {
    dispatch({ type: SET_IMAGE, image });
  };

  const removeImage = () => {
    dispatch({ type: SET_IMAGE, image: { url: null } });
  };

  const submitChanges = () => {
    const updatedPostData = {
      author,
      post: { ...post, text: state.text, image: state.image, url: state.image.url },
      previousUrl: post.url,
    };

    onUpdatePost(updatedPostData, handleBackdropClick);
  };

  const changeInputValue = (text) => {
    const postWasChanged = !(post.text === text);
    dispatch({ type: SET_TEXT, text: text, changed: postWasChanged });
  };

  return (
    <React.Fragment>
      <Backdrop onClick={handleBackdropClick} />
      <div className={classes.postEditionModal} data-test='post-edition-modal-component'>
        {isLoading && <SpinnerContainer />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitChanges();
          }}
        >
          <textarea
            value={state.text}
            required
            ref={textAreaRef}
            className={classes.textArea}
            data-test='textarea'
            onChange={(e) => changeInputValue(e.target.value)}
          />
          {state.image.url && (
            <div className={classes.imageContainer} data-test='image-container'>
              <ClearIcon className={iconStyle.removePhoto} onClick={removeImage} data-test='remove-icon' />
              <img src={state.image.url} className={classes.image} alt='post image' />
            </div>
          )}
          <div className={classes.bottomBar}>
            <div className={classes.iconsContainer}>
              <FileInput onDropHandler={setImage}>
                <PhotoIcon className={iconStyle.addPhoto} />
              </FileInput>
              <EmojiPicker
                style={iconStyle.emoji}
                input={{ ref: textAreaRef, value: state.text, changeValue: changeInputValue }}
                pickerStyle={{ width: '250px', bottom: '100%', boxShadow: 'unset', borderColor: '#888' }}
                setCursorPosition={(position) => dispatch({ type: SET_CURSOR_POSITION, cursorPosition: position })}
              />
            </div>
            <Button className={classes.button} disabled={!state.imageChanged && !state.textChanged} testData='submit-button'>
              Submit changes
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.posts.isUpdatePostLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePost: (updatedPostData, hideModal) => dispatch(actions.updatePost(updatedPostData, hideModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditionModal);
