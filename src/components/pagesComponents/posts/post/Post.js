import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import * as actions from "./../../../../actions/index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import classes from "./post.module.scss";
import PostEditionModal from "./postEditionModal/PostEditionModal";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      0: 0,
      400: 400,
      600: 600,
      768: 768,
      800: 800,
      1000: 1000,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    color: "#ffa500",
    cursor: "pointer",
    [theme.breakpoints.up("0")]: {
      width: 26,
      height: 26,
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

    [`${theme.breakpoints.up("800")} and (orientation:landscape)`]: {
      width: 35,
      height: 35,
    },

    [`${theme.breakpoints.up("1000")} and (orientation:landscape)`]: {
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
  const creationTime = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()} | ${date.getHours()}:${minutes}`;
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
        <NavLink to={`/users?user=${props.author.modifiedEmail}`}>
          <div className={classes.author}>
            <img src={props.profileImage} className={classes.profileImage} alt="post author profile image" />
            <div>
              <p className={classes.authorName}>{props.author.name}</p>
              <p className={classes.postCreationTime}>{creationTime}</p>
            </div>
          </div>
        </NavLink>
        {props.currUserModifiedEmail === props.author.modifiedEmail && (
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
        <p className={classes.text} data-test="text">
          {props.post.text}
        </p>
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
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
