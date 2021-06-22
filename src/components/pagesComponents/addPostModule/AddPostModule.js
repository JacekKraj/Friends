import React, { useCallback } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./../../../utilities/breakpoints/breakpoints";

import ClearIcon from "@material-ui/icons/Clear";
import PhotoIcon from "@material-ui/icons/Photo";
import classes from "./addPostModule.module.scss";
import Button from "./../../UI/button/Button";
import * as actions from "./../../../actions/index";
import FileInput from "./../fileInput/FileInput";
import SpinnerContainer from "./../../../utilities/spinnerContainer/SpinnerContainer";

const useStyles = makeStyles(() => ({
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
      width: 36,
      height: 36,
    },

    [`${theme.breakpoints.up("1000")} and (orientation:landscape)`]: {
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
    [theme.breakpoints.up("0")]: {
      top: "1%",
      right: "1%",
      width: 24,
      height: 24,
    },

    [theme.breakpoints.up("600")]: {
      width: 38,
      height: 38,
    },

    [`${theme.breakpoints.up("600")} and (orientation:landscape)`]: {
      width: 25,
      height: 25,
      top: "1.5%",
      right: "1%",
    },

    [`${theme.breakpoints.up("800")} and (orientation:landscape)`]: {
      width: 27,
      height: 27,
      padding: "0.3%",
      top: "2%",
      right: "0.5%",
    },

    [`${theme.breakpoints.up("1000")} and (orientation:landscape)`]: {
      width: 32,
      height: 32,
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

  const clearPostAfterSuccess = () => {
    handleRemovePhoto();
    dispatch({ type: SET_TEXT, text: "" });
  };

  const handleDrop = useCallback((event) => {
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

  const handleSubmit = () => {
    const date = new Date();
    const creationTime = date.getTime();
    const image = state.images[0] || { preview: null };
    const post = {
      creationTime,
      text: state.text,
      image,
      url: image.preview,
    };
    const totalPostsCreated =
      props.usersPosts[props.currUserModifiedEmail].totalPostsCreated !== 0 ? props.usersPosts[props.currUserModifiedEmail].totalPostsCreated + 1 : 1;
    const author = {
      modifiedEmail: props.currUserModifiedEmail,
      name: props.currUserName,
      profileImage: props.currUserProfileImage,
    };
    props.onAddUserPost(post, author, clearPostAfterSuccess, totalPostsCreated);
  };

  return (
    <div className={classes.addPostModuleComponent} data-test="add-post-module-component">
      {props.isLoading && <SpinnerContainer />}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
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
          <FileInput handleDrop={handleDrop}>
            <PhotoIcon className={iconStyle.addPhoto} />
          </FileInput>
          <Button className={classes.button}>Post</Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
    usersPosts: state.posts.usersPosts,
    currUserName: state.userData.currentUser.name,
    currUserProfileImage: state.userData.currentUser.profileImage,
    isLoading: state.posts.newPostLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddUserPost: (post, author, clearPost, totalPostsCreated) => dispatch(actions.addUserPost(post, author, clearPost, totalPostsCreated)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedAddPostModule);
