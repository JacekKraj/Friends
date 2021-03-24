import React from "react";
import { connect } from "react-redux";

import classes from "./mainContent.module.scss";
import Header from "./../../header/Header";
import AddPostModule from "../../addPostModule/AddPostModule";
import * as actions from "./../../../../actions/index";
import Posts from "./../../posts/Posts";
import { createArrayOfPosts } from "./../../../../utilities/helperFunctions/createArrayOfPosts";

const MainContent = (props) => {
  const [posts, setPosts] = React.useState([]);
  const handleNewPostSubmit = (values, clearPost) => {
    const post = {
      ...values,
      url: values.img.preview,
      name: props.userModifiedEmail,
    };
    const totalPostsCreated =
      props.usersPosts[props.userModifiedEmail].totalPostsCreated !== 0 ? props.usersPosts[props.userModifiedEmail].totalPostsCreated + 1 : 1;
    const author = {
      modifiedEmail: props.userModifiedEmail,
      name: props.userName,
      profileImage: props.userProfileImage,
    };
    props.onAddUserPost(post, author, clearPost, totalPostsCreated);
  };

  React.useEffect(() => {
    props.onGetUsersPosts(props.userModifiedEmail);
  }, [props.userModifiedEmail]);

  React.useEffect(() => {
    const allUsersPosts = createArrayOfPosts(props.usersPosts);
    setPosts(allUsersPosts);
  }, [props.usersPosts]);

  return (
    <div className={classes.mainContentComponent}>
      <Header
        navOnClick={() => props.setShowNav(true)}
        discoverBarOnClick={() => {
          props.setShowDiscoverBar(true);
        }}
        sectionName="Home"
      />
      <main>
        <AddPostModule handleSubmit={handleNewPostSubmit} />
        <Posts posts={posts} />
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddUserPost: (post, author, clearPost, totalPostsCreated) => dispatch(actions.addUserPost(post, author, clearPost, totalPostsCreated)),
    onGetUsersPosts: (modifiedEmail) => dispatch(actions.getUsersPosts(modifiedEmail)),
  };
};

const mapStateToProps = (state) => {
  return {
    userModifiedEmail: state.userData.modifiedEmail,
    usersPosts: state.posts.usersPosts,
    userName: state.userData.name,
    userProfileImage: state.userData.profileImage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
