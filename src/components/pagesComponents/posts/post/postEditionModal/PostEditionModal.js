import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import PhotoIcon from "@material-ui/icons/Photo";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import classes from "./postEditionModal.module.scss";
import Backdrop from "./../../../../UI/backdrop/Backdrop";
import Button from "./../../../../UI/button/Button";
import { theme } from "./../../../../../utilities/breakpoints/breakpoints";
import FileInput from "./../../../fileInput/FileInput";
import * as actions from "./../../../../../actions/index";
import SpinnerContainer from "./../../../../../utilities/spinnerContainer/SpinnerContainer";

const useStyles = makeStyles(() => ({
  removePhoto: {
    cursor: "pointer",
    position: "absolute",
    backgroundColor: "rgb(252,252,252)",
    color: "#333",
    borderRadius: "50%",
    padding: "0.5%",
    [theme.breakpoints.up("0")]: {
      width: 26,
      height: 26,
      top: "2%",
      right: "2%",
    },
    [theme.breakpoints.up("400")]: {
      width: 33,
      height: 33,
    },

    [theme.breakpoints.up("768")]: {
      width: 45,
      height: 45,
    },

    [`${theme.breakpoints.up("600")} and (orientation:landscape)`]: {
      width: 31,
      height: 31,
    },
  },
  addPhoto: {
    cursor: "pointer",
    color: "#0eb611",
    [theme.breakpoints.up("0")]: {
      width: 30,
      height: 30,
      marginBottom: -6,
      marginTop: -1,
    },
    [theme.breakpoints.up("768")]: {
      width: 45,
      height: 45,
      marginBottom: -8,
    },

    [`${theme.breakpoints.up("600")} and (orientation:landscape)`]: {
      width: 31,
      height: 31,
    },

    [`${theme.breakpoints.up("800")} and (orientation:landscape)`]: {
      width: 33,
      height: 33,
    },
  },
}));

const SET_TEXT = "SET_TEXT";
const SET_IMAGE = "SET_IMAGE";

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
  });

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
            className={classes.textArea}
            data-test="textarea"
            onChange={(e) => dispatch({ type: SET_TEXT, text: e.target.value, touched: props.post.text === e.target.value ? false : true })}
          />
          {state.image.url && (
            <div className={classes.imageContainer} data-test="image-container">
              <ClearIcon className={iconStyle.removePhoto} onClick={handleRemoveImage} data-test="remove-icon" />
              <img src={state.image.url} className={classes.image} alt="post image" />
            </div>
          )}
          <div className={classes.bottomBar}>
            <FileInput handleDrop={handleDrop}>
              <PhotoIcon className={iconStyle.addPhoto} />
            </FileInput>
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
