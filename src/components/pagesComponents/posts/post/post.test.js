import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { storeFactory, findByTestAttr } from "./../../../../utilities/tests/testsHelperFunctions";
import Post from "./Post";

let store;
const setup = (initialState, defaultProps) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <Post {...defaultProps} />
      </BrowserRouter>
    </Provider>
  );
};

const defaultProps = {
  author: { name: "name", modifiedEmail: "jacekkrajewski12wppl" },
  post: { creationTime: 1615988637142, index: 1, name: "jacekkrajewski12wppl", text: "text", type: "users" },
};

describe("current user and post author are same account", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(
      {
        userData: { currentUser: { modifiedEmail: "jacekkrajewski12wppl" } },
      },
      {
        ...defaultProps,
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

  test("shows postEditionPanel on clicking post edition icon", () => {
    const postEditionIcon = findByTestAttr(wrapper, "post-edition-icon").first();
    postEditionIcon.simulate("click");
    const postEditionPanel = findByTestAttr(wrapper, "component-post-edition-panel");
    expect(postEditionPanel.exists()).toBe(true);
  });

  test("shows post edition modal", () => {
    const postEditionIcon = findByTestAttr(wrapper, "post-edition-icon").first();
    postEditionIcon.simulate("click");
    const postEditionButton = findByTestAttr(wrapper, "edit-btn");
    postEditionButton.simulate("click");
    const postEditionModal = findByTestAttr(wrapper, "post-edition-modal-component");
    expect(postEditionModal.exists()).toBe(true);
  });
});

describe("current user and post author are not same account", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(
      {
        userData: { currentUser: { modifiedEmail: "asdwppl" } },
      },
      {
        ...defaultProps,
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
  const initialState = {
    userData: { currentUser: { modifiedEmail: "asdwppl" } },
  };
  test("displays post image when post has url prop", () => {
    const wrapper = setup(
      {
        ...initialState,
      },
      {
        ...defaultProps,
        post: { ...defaultProps.post, url: "asd.com" },
      }
    );
    const postImage = findByTestAttr(wrapper, "post-image");
    expect(postImage.exists()).toBe(true);
  });
  test("doesn't display image when post doesn't have url prop", () => {
    const wrapper = setup({ ...initialState }, { ...defaultProps });
    const postImage = findByTestAttr(wrapper, "post-image");
    expect(postImage.exists()).toBe(false);
  });
});
