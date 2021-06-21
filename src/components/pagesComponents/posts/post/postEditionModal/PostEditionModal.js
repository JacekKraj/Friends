import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import PhotoIcon from "@material-ui/icons/Photo";

import { makeStyles } from "@material-ui/core/styles";

import classes from "./postEditionModal.module.scss";
import Backdrop from "./../../../../UI/backdrop/Backdrop";
import Button from "./../../../../UI/button/Button";
import { theme } from "./../../../../../utilities/breakpoints/breakpoints";
import FileInput from "./../../../fileInput/FileInput";

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
      width: 50,
      height: 50,
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
      width: 28,
      height: 28,
      marginBottom: -5,
    },
    [theme.breakpoints.up("768")]: {
      width: 35,
      height: 35,
      marginBottom: -8,
    },

    [`${theme.breakpoints.up("600")} and (orientation:landscape)`]: {
      width: 31,
      height: 31,
    },

    [`${theme.breakpoints.up("800")} and (orientation:landscape)`]: {
      width: 33,
      height: 33,
      marginTop: -3,
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
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.image,
      };
    default:
      return state;
  }
};

const PostEditionModal = (props) => {
  const iconStyle = useStyles();
  const [state, dispatch] = React.useReducer(reducer, { image: { url: props.post.url }, text: props.post.text });

  const handleDrop = React.useCallback((event) => {
    const newImage = [event.target.files[0]].map((file) =>
      Object.assign(file, {
        url: URL.createObjectURL(file),
      })
    );
    dispatch({ type: SET_IMAGE, image: newImage[0] });
  });

  const handleRemoveImage = React.useCallback(() => {
    dispatch({ type: SET_IMAGE, image: {} });
  });

  console.log(state);
  return (
    <React.Fragment>
      <Backdrop onClick={props.backdropClick} />
      <div className={classes.postEditionModal}>
        <textarea
          value={state.text}
          required={true}
          className={classes.textArea}
          onChange={(e) => dispatch({ type: SET_TEXT, text: e.target.value })}
        />
        {state.image.url && (
          <div className={classes.imageContainer}>
            <ClearIcon className={iconStyle.removePhoto} onClick={handleRemoveImage} />
            {!state.image.url && <div className={classes.imageBg}></div>}
            <img src={state.image.url} className={classes.image} alt="post image" />
          </div>
        )}
        <div className={classes.bottomBar}>
          <FileInput handleDrop={handleDrop}>
            <PhotoIcon className={iconStyle.addPhoto} />
          </FileInput>
          <Button className={classes.button}>Submit changes</Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostEditionModal;
