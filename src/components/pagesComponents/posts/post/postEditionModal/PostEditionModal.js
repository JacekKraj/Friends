import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import PhotoIcon from "@material-ui/icons/Photo";
import { connect } from "react-redux";
import { useStyles } from "./../../../addPostModule/AddPostModule";

import classes from "./postEditionModal.module.scss";
import Backdrop from "./../../../../UI/backdrop/Backdrop";
import Button from "./../../../../UI/button/Button";
import FileInput from "./../../../fileInput/FileInput";
import * as actions from "./../../../../../actions/index";
import SpinnerContainer from "./../../../../../utilities/spinnerContainer/SpinnerContainer";
import EmojiPicker from "./../../../../../utilities/emojiPicker/EmojiPicker";

const SET_TEXT = "SET_TEXT";
const SET_IMAGE = "SET_IMAGE";
const SET_CURSOR_POSITION = "SET_CURSOR_POSITION";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        text: action.text,
        textTouched: action.touched,
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.image,
        imageTouched: true,
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
  const iconStyle = useStyles();
  const [state, dispatch] = React.useReducer(reducer, {
    image: { url: props.post.url },
    text: props.post.text,
    textTouched: false,
    imageTouched: false,
    cursorPosition: 0,
  });

  const textArea = React.useRef();

  React.useEffect(() => {
    textArea.current.selectionEnd = state.cursorPosition;
  }, [state.cursorPosition]);

  React.useEffect(() => {
    textArea.current.selectionStart = props.post.text.length;
  }, [props.post.text.length]);

  const handleDrop = React.useCallback((event) => {
    const newImage = [event.target.files[0]].map((file) =>
      Object.assign(file, {
        url: URL.createObjectURL(file),
      })
    );
    dispatch({ type: SET_IMAGE, image: newImage[0] });
  });

  const handleRemoveImage = React.useCallback(() => {
    dispatch({ type: SET_IMAGE, image: { url: null } });
  });

  const handleSubmit = () => {
    props.onUpdatePost(
      props.author,
      { ...props.post, text: state.text, image: state.image, url: state.image.url },
      props.post.url,
      props.backdropClick
    );
  };

  const handleChangeInputValue = (text) => {
    dispatch({ type: SET_TEXT, text: text, touched: props.post.text === text ? false : true });
  };

  return (
    <React.Fragment>
      <Backdrop onClick={props.backdropClick} />
      <div className={classes.postEditionModal} data-test="post-edition-modal-component">
        {props.isLoading && <SpinnerContainer />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <textarea
            value={state.text}
            required={true}
            ref={textArea}
            className={classes.textArea}
            data-test="textarea"
            onChange={(e) => handleChangeInputValue(e.target.value)}
          />
          {state.image.url && (
            <div className={classes.imageContainer} data-test="image-container">
              <ClearIcon className={iconStyle.removePhoto} onClick={handleRemoveImage} data-test="remove-icon" />
              <img src={state.image.url} className={classes.image} alt="post image" />
            </div>
          )}
          <div className={classes.bottomBar}>
            <div className={classes.iconsContainer}>
              <FileInput handleDrop={handleDrop}>
                <PhotoIcon className={iconStyle.addPhoto} />
              </FileInput>
              <EmojiPicker
                style={iconStyle.emoji}
                input={textArea}
                pickerStyle={{ width: "250px", bottom: "100%", boxShadow: "unset", borderColor: "#888" }}
                setCursorPosition={(position) => dispatch({ type: SET_CURSOR_POSITION, cursorPosition: position })}
                inputValue={state.text}
                handleChangeInputValue={(text) => handleChangeInputValue(text)}
              />
            </div>
            <Button className={classes.button} disabled={!state.imageTouched && !state.textTouched} testData="submit-button">
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
    isLoading: state.posts.updatePostLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePost: (author, post, previousUrl, hideModal) => dispatch(actions.updatePost(author, post, previousUrl, hideModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditionModal);
