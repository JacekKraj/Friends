import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Posts from "./Posts";
import { storeFactory, findByTestAttr } from "./../../../utilities/tests/testsHelperFunctions";

describe("displaying posts", () => {
  let store, wrapper;
  const setup = (initialState, defaultProps) => {
    store = storeFactory(initialState);
    return mount(
      <Provider store={store}>
        <BrowserRouter>
          <Posts {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );
  };

  afterEach(() => {
    wrapper.unmount();
  });

  test("displays 'There are no posts to display' when posts array is empty", () => {
    wrapper = setup(
      { posts: { getPostsLoading: false } },
      {
        posts: [],
      }
    );
    const noPostsInfo = findByTestAttr(wrapper, "no-posts-info");
    expect(noPostsInfo.text()).toEqual("There are no posts to display.");
  });

  test("show spinner when isLoading is true", () => {
    wrapper = setup(
      { posts: { getPostsLoading: true } },
      {
        posts: [],
      }
    );
    const spinner = findByTestAttr(wrapper, "component-spinner");
    expect(spinner.exists()).toBe(true);
  });

  test("display one post when posts array is not initially empty", () => {
    wrapper = setup(
      { posts: { getPostsLoading: false } },
      {
        posts: [
          {
            author: { name: "name", modifiedEmail: "jacekkrajewski12wppl" },
            post: { creationTime: 1615988637142, index: 1, name: "jacekkrajewski12wppl", text: "text", type: "users" },
          },
        ],
      }
    );
    const post = findByTestAttr(wrapper, "post-component");
    expect(post.exists()).toBe(true);
  });
});
