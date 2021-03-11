import React, { useCallback } from "react";
import { connect } from "react-redux";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import ClearIcon from "@material-ui/icons/Clear";
import PhotoIcon from "@material-ui/icons/Photo";
import classes from "./addPostModule.module.scss";
import Button from "./../../UI/button/Button";
import Spinner from "./../../UI/spinner/Spinner";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 411,
      md: 600,
      mdlg: 800,
      lg: 1000,
      xl: 1150,
    },
  },
});

const useStyles = makeStyles(() => ({
  addPhoto: {
    cursor: "pointer",
    color: "#0eb611",
    [theme.breakpoints.up("xs")]: {
      width: 28,
      height: 28,
      marginBottom: -5,
    },
    [theme.breakpoints.up("md")]: {
      width: 48,
      height: 48,
      marginBottom: -8,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 33,
      height: 33,
    },

    [`${theme.breakpoints.up("mdlg")} and (orientation:landscape)`]: {
      width: 36,
      height: 36,
    },

    [`${theme.breakpoints.up("xl")} and (orientation:landscape)`]: {
      width: 32,
      height: 32,
      marginTop: -2,
    },
  },
  removePhoto: {
    cursor: "pointer",
    position: "absolute",
    backgroundColor: "rgb(252,252,252)",
    color: "#333",
    borderRadius: "50%",
    padding: "0.5%",
    [theme.breakpoints.up("xs")]: {
      top: "1%",
      right: "1%",
      width: 24,
      height: 24,
    },

    [theme.breakpoints.up("md")]: {
      width: 38,
      height: 38,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 25,
      height: 25,
      top: "1.5%",
      right: "1%",
    },

    [`${theme.breakpoints.up("mdlg")} and (orientation:landscape)`]: {
      width: 27,
      height: 27,
      padding: "0.3%",
      top: "2%",
      right: "0.5%",
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 32,
      height: 32,
    },

    [`${theme.breakpoints.up("xl")} and (orientation:landscape)`]: {
      width: 28,
      height: 28,
      top: "1%",
    },
  },
}));

const SET_IMAGES = "SET_IMAGES";
const SET_TEXT = "SET_TEXT";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return {
        ...state,
        images: action.images,
      };
    case SET_TEXT:
      return {
        ...state,
        text: action.text,
      };
  }
};

export const UnconnectedAddPostModule = (props) => {
  const iconStyle = useStyles();
  const [state, dispatch] = React.useReducer(reducer, { images: [], text: "" });

  const onDrop = useCallback((event) => {
    const newImages = [event.target.files[0]].map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    dispatch({ type: SET_IMAGES, images: newImages });
  }, []);

  const handleRemovePhoto = () => {
    dispatch({ type: SET_IMAGES, images: [] });
  };

  const clearPostAfterSuccess = () => {
    handleRemovePhoto();
    dispatch({ type: SET_TEXT, text: "" });
  };

  return (
    <div className={classes.addPostModuleComponent}>
      {props.isLoading && (
        <div className={classes.spinnerContainer}>
          <Spinner className={classes.spinnerWhite} />
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const date = new Date();
          const creationTime = date.getTime();
          props.handleSubmit({ text: state.text, img: state.images[0], creationTime, clearPostAfterSuccess });
        }}
      >
        <textarea
          className={classes.textarea}
          value={state.text}
          required={true}
          onChange={(e) => {
            dispatch({ type: SET_TEXT, text: e.target.value });
          }}
          placeholder="What are you thinking about?"
        />
        {state.images.map((el, idx) => {
          return (
            <div className={classes.photoPreviewContainer} key={idx}>
              <ClearIcon className={iconStyle.removePhoto} onClick={handleRemovePhoto} />
              <img src={el.preview} className={classes.photoPreview} data-test="image" />
            </div>
          );
        })}
        <div className={classes.addPostModulBottomBar}>
          <div className={classes.addFileButton}>
            <input
              type="file"
              id="fileInput"
              className={classes.fileInput}
              accept="image/png, image/jpeg"
              onChange={(event) => {
                onDrop(event);
              }}
            />
            <label htmlFor="fileInput">
              <PhotoIcon className={iconStyle.addPhoto} />
            </label>
          </div>
          <Button className={classes.button}>Post</Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.posts.loading,
  };
};

export default connect(mapStateToProps)(UnconnectedAddPostModule);
