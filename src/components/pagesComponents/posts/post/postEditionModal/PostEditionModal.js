import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoIcon from '@material-ui/icons/Photo';
import { useStyles } from './../../../addPostModule/AddPostModule';
import { useSelector } from 'react-redux';

import { useActions } from '../../../../../utilities/hooks/useActions';
import classes from './postEditionModal.module.scss';
import Button from './../../../../UI/button/Button';
import FileInput from '../../../imageFileInput/ImageFileInput';
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
        imageChanged: action.changed,
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

const PostEditionModal = () => {
  const { isUpdatePostLoading } = useSelector((state) => state.posts);
  const { props } = useSelector((state) => state.modals);
  const { updatePost } = useActions();

  const iconStyle = useStyles();

  const [state, dispatch] = React.useReducer(reducer, {
    image: { url: props.url },
    text: props.text,
    textChanged: false,
    imageChanged: false,
    cursorPosition: 0,
  });

  const textAreaRef = React.useRef();

  React.useEffect(() => {
    textAreaRef.current.selectionEnd = state.cursorPosition;
  }, [state.cursorPosition]);

  React.useEffect(() => {
    textAreaRef.current.selectionStart = props.text.length;
  }, [props.text.length]);

  const setImage = (image) => {
    dispatch({ type: SET_IMAGE, image, changed: props.url !== image.url });
  };

  const submitChanges = () => {
    const updatedPostData = {
      post: { ...props, text: state.text, image: state.image, url: state.image.url },
      previousUrl: props.url,
    };

    updatePost(updatedPostData);
  };

  const changeInputValue = (text) => {
    const postWasChanged = !(props.text === text);
    dispatch({ type: SET_TEXT, text: text, changed: postWasChanged });
  };

  return (
    <div className={classes.postEditionModal} data-test='component-post-edition-modal'>
      {isUpdatePostLoading && <SpinnerContainer />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitChanges();
        }}
        data-test='post-edition-form'
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
            <ClearIcon className={iconStyle.removePhoto} onClick={() => setImage({ url: null })} data-test='remove-icon' />
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
  );
};

export default PostEditionModal;
