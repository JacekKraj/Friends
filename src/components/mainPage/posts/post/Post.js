import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import * as actions from "./../../../../actions/index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import classes from "./post.module.scss";
import defaultProfileImage from "./../../../../assets/images/defaultUserImage.png";
import PostEditionModal from "./postEditionModal/PostEditionModal";

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
  icon: {
    color: "#ffa500",
    cursor: "pointer",
    [theme.breakpoints.up("xs")]: {
      width: 26,
      height: 26,
    },
    [theme.breakpoints.up("sm")]: {
      width: 33,
      height: 33,
    },

    [theme.breakpoints.up("md")]: {
      width: 50,
      height: 50,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 31,
      height: 31,
    },

    [`${theme.breakpoints.up("mdlg")} and (orientation:landscape)`]: {
      width: 35,
      height: 35,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 39,
      height: 39,
    },
  },
}));

const Post = (props) => {
  const [showEditionModal, setShowEditionModal] = React.useState(false);
  const iconStyle = useStyles();
  const date = new Date(props.post.creationTime);
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const creationTime = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()} | ${date.getHours()}:${minutes}`;
  const postEditionModal = React.useRef();

  const handleOutsideClick = (event) => {
    if (postEditionModal.current) {
      if (!postEditionModal.current.contains(event.target)) {
        setShowEditionModal(false);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={classes.postComponent} data-test="post-component">
      <div className={classes.postHeader}>
        <NavLink to={`${props.author.name}`}>
          <div className={classes.author}>
            <img src={!props.author.profileImage && defaultProfileImage} className={classes.profileImage} alt="post author profile image" />
            <div>
              <p className={classes.authorName}>{props.author.name}</p>
              <p className={classes.postCreationTime}>{creationTime}</p>
            </div>
          </div>
        </NavLink>
        {props.userModifiedEmail === props.author.modifiedEmail && (
          <div className={classes.postEditionModalContainer} ref={postEditionModal}>
            <MoreHorizIcon
              className={iconStyle.icon}
              data-test="post-edition-icon"
              onClick={() => {
                setShowEditionModal(!showEditionModal);
              }}
            />
            {showEditionModal && (
              <PostEditionModal
                handleDelete={() => {
                  props.onRemovePost(props.post.index, props.author.modifiedEmail);
                }}
              />
            )}
          </div>
        )}
      </div>
      <div className={classes.mainPostPart}>
        <p className={classes.text}>{props.post.text}</p>
        {props.post.url && <img src={props.post.url} className={classes.postImage} data-test="post-image" alt="post picture" />}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovePost: (id, user) => dispatch(actions.removePost(id, user)),
  };
};

const mapStateToProps = (state) => {
  return {
    userModifiedEmail: state.userData.modifiedEmail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
