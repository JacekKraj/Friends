import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import { storeFactory, findByTestAttr } from "./../../../../utilities/tests/testsHelperFunctions";
import Post from "./Post";

let store;
const setup = (initialState, defaultProps) => {
  store = storeFactory(initialState);
  return mount(
    <BrowserRouter>
      <Post store={store} {...defaultProps} />
    </BrowserRouter>
  );
};

describe("current user and post author are same account", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(
      {
        userData: { modifiedEmail: "jacekkrajewski12wppl" },
      },
      {
        author: { name: "name", modifiedEmail: "jacekkrajewski12wppl" },
        post: { creationTime: 1615988637142, index: 1, name: "jacekkrajewski12wppl", text: "text", type: "users" },
      }
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("show post edition icon", () => {
    const postEditionIcon = findByTestAttr(wrapper, "post-edition-icon");
    expect(postEditionIcon.exists()).toBe(true);
  });

  test("shows postEditionModal on clicking post edition icon", () => {
    const postEditionIcon = findByTestAttr(wrapper, "post-edition-icon").first();
    postEditionIcon.simulate("click");
    const postEditionModal = findByTestAttr(wrapper, "component-post-edition-modal");
    expect(postEditionModal.exists()).toBe(true);
  });
});

describe("current user and post author are not same account", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(
      {
        userData: { modifiedEmail: "asdwppl" },
      },
      {
        author: { name: "name", modifiedEmail: "jacekkrajewski12wppl" },
        post: { creationTime: 1615988637142, index: 1, name: "jacekkrajewski12wppl", text: "text", type: "users" },
      }
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });
  test("doesn't show post edition icon", () => {
    const postEditionIcon = findByTestAttr(wrapper, "post-edition-icon");
    expect(postEditionIcon.exists()).toBe(false);
  });
});

describe("displaying post image", () => {
  test("displays post image when post has url prop", () => {
    const wrapper = setup(
      {
        userData: { modifiedEmail: "asdwppl" },
      },
      {
        author: { name: "name", modifiedEmail: "jacekkrajewski12wppl" },
        post: { creationTime: 1615988637142, index: 1, name: "jacekkrajewski12wppl", text: "text", type: "users", url: "asd.com" },
      }
    );
    const postImage = findByTestAttr(wrapper, "post-image");
    expect(postImage.exists()).toBe(true);
  });
  test("doesn't display image when post doesn't have url prop", () => {
    const wrapper = setup(
      {
        userData: { modifiedEmail: "asdwppl" },
      },
      {
        author: { name: "name", modifiedEmail: "jacekkrajewski12wppl" },
        post: { creationTime: 1615988637142, index: 1, name: "jacekkrajewski12wppl", text: "text", type: "users" },
      }
    );
    const postImage = findByTestAttr(wrapper, "post-image");
    expect(postImage.exists()).toBe(false);
  });
});
