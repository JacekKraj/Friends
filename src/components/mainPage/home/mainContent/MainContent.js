import React from "react";
import { connect } from "react-redux";

import classes from "./mainContent.module.scss";
import Header from "./../../header/Header";
import AddPostModule from "../../addPostModule/AddPostModule";
import * as actions from "./../../../../actions/index";

const MainContent = (props) => {
  const handleNewPostSubmit = (values) => {
    props.onAddPost(values.text, values.img, props.userModifiedEmail, props.userPosts, values.creationTime, values.clearPostAfterSuccess);
  };

  return (
    <div className={classes.mainContentComponent}>
      <Header navOnClick={() => props.setShowNav(true)} sectionName="Home" />
      <main>
        <AddPostModule handleSubmit={handleNewPostSubmit} />
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPost: (text, img, user, userPosts, creationTime, clearPostAfterSuccess) =>
      dispatch(actions.addUserPost(text, img, user, userPosts, creationTime, clearPostAfterSuccess)),
  };
};

const mapStateToProps = (state) => {
  return {
    userModifiedEmail: state.userData.modifiedEmail,
    userPosts: state.posts.userPosts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
