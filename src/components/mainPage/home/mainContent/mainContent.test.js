import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { storeFactory, findByTestAttr } from "./../../../../utilities/tests/testsHelperFunctions";
import MainContent from "./MainContent";
import * as actions from "./../../../../actions/index";

let store;
const setup = (initialState) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </Provider>
  );
};

test("add post after dispatching createUserPost action creator", () => {
  const wrapper = setup({
    posts: {
      usersPosts: {},
    },
  });
  const newPost = {
    author: { name: "name", modifiedEmail: "jacekkrajewski12wppl" },
    post: { creationTime: 1615988637142, index: 1, name: "jacekkrajewski12wppl", text: "text" },
  };
  store.dispatch(actions.createUserPost(newPost, 1));
  wrapper.setProps();
  const post = findByTestAttr(wrapper, "post-component");
  expect(post.exists()).toBe(true);
});

test("removes post after clicking remove button", () => {
  const wrapper = setup({
    posts: {
      usersPosts: {
        jacekkrajewski12wppl: {
          posts: {
            1: {
              author: { name: "name", modifiedEmail: "jacekkrajewski12wppl" },
              post: { creationTime: 1615988637142, index: 1, name: "jacekkrajewski12wppl", text: "text" },
            },
          },
          totalPostsCreated: 1,
        },
      },
      getPostsLoading: false,
    },
    userData: { modifiedEmail: "jacekkrajewski12wppl" },
  });
  store.dispatch(actions.setGetPostsLoading(false));
  wrapper.setProps();
  const postEditionIcon = findByTestAttr(wrapper, "post-edition-icon").first();
  postEditionIcon.simulate("click");
  const removeBtn = findByTestAttr(wrapper, "remove-btn");
  removeBtn.simulate("click");
  const post = findByTestAttr(wrapper, "post-component");
  expect(post.exists()).toBe(false);
});
