import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import ClearIcon from "@material-ui/icons/Clear";
import PhotoIcon from "@material-ui/icons/Photo";
import classes from "./addPostModule.module.scss";
import Button from "./../../UI/button/Button";
import * as actions from "./../../../actions/index";

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
    color: "#fff",
    [theme.breakpoints.up("xs")]: {
      width: 20,
      height: 20,
    },
    [theme.breakpoints.up("md")]: {
      width: 30,
      height: 30,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 21,
      height: 21,
    },

    [`${theme.breakpoints.up("mdlg")} and (orientation:landscape)`]: {
      width: 23,
      height: 23,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 24,
      height: 24,
    },

    [`${theme.breakpoints.up("xl")} and (orientation:landscape)`]: {
      width: 21,
      height: 21,
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
      width: 30,
      height: 30,
      top: "1%",
    },
  },
}));

const AddPostModule = (props) => {
  const iconStyle = useStyles();
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    setImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const handleRemovePhoto = () => {
    setImages([]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/jpeg, image/png", maxFiles: 1 });
  return (
    <div className={classes.addPostModuleComponent}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const createTime = new Date();
          props.onAddPost(text, images[0], props.userModifiedEmail, props.userPosts, createTime.getTime());
        }}
      >
        <textarea className={classes.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="What are you thinking about?" />
        {images.map((el, idx) => {
          return (
            <div className={classes.photoPreviewContainer} key={idx}>
              <ClearIcon className={iconStyle.removePhoto} onClick={handleRemovePhoto} />
              <img src={el.preview} className={classes.photoPreview} />
            </div>
          );
        })}
        <div className={classes.addPostModulBottomBar}>
          <div className={classes.addFileButton} {...getRootProps()}>
            <PhotoIcon className={iconStyle.addPhoto} />
            <input {...getInputProps()} />
          </div>
          <Button className={classes.button}>Post</Button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (text, img, user, userPosts, creationTime) => dispatch(actions.addPost(text, img, user, userPosts, creationTime)),
  };
};

const mapStateToProps = (state) => {
  return {
    userModifiedEmail: state.userData.modifiedEmail,
    userPosts: state.posts.userPosts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostModule);
