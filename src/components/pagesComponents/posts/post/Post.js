import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { theme } from "./../../../../utilities/breakpoints/breakpoints";
import * as actions from "./../../../../actions/index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import classes from "./post.module.scss";
import PostEditionPanel from "./postEditionPanel/PostEditionPanel";
import PostEditionModal from "./postEditionModal/PostEditionModal";

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
  const [showEditionPanel, setShowEditionPanel] = React.useState(false);
  const [showEditionModal, setShowEditionModal] = React.useState(false);
  const iconStyle = useStyles();
  const date = new Date(props.post.creationTime);
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const creationTime = `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()} | ${date.getHours()}:${minutes}`;
  const postEditionPanel = React.useRef();

  const handleOutsideClick = (event) => {
    if (postEditionPanel.current) {
      if (!postEditionPanel.current.contains(event.target)) {
        setShowEditionPanel(false);
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
    <React.Fragment>
      {showEditionModal && <PostEditionModal author={props.author} post={props.post} backdropClick={() => setShowEditionModal(false)} />}
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
            <div className={classes.postEditionPanelContainer} ref={postEditionPanel}>
              <MoreHorizIcon
                className={iconStyle.icon}
                data-test="post-edition-icon"
                onClick={() => {
                  setShowEditionPanel(!showEditionPanel);
                }}
              />
              {showEditionPanel && (
                <PostEditionPanel
                  handleDelete={() => {
                    props.onRemovePost(props.post.index, props.author.modifiedEmail);
                  }}
                  handleEdit={() => setShowEditionModal(true)}
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
    </React.Fragment>
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
