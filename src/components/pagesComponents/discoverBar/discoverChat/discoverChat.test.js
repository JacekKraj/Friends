import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import { findByTestAttr, storeFactory } from "./../../../../utilities/tests/testsHelperFunctions";
import DiscoverChat from "./DiscoverChat";

const setup = (initialState) => {
  const store = storeFactory(initialState);
  return mount(
    <BrowserRouter>
      <DiscoverChat store={store} />
    </BrowserRouter>
  );
};

test("display no users info when followed users array is empty", () => {
  const wrapper = setup({ userData: { followedUsers: [] } });
  const noUsersInfo = findByTestAttr(wrapper, "no-users-info");
  expect(noUsersInfo.text()).toEqual("Follow other users to start chatting with them.");
});

test("display users info when followed users array is not empty", () => {
  const wrapper = setup({ userData: { followedUsers: [{ modifiedEmail: "testwppl", name: "Test Test", birthdayDate: {} }] } });
  const chatUserComponent = findByTestAttr(wrapper, "chat-user-component");
  expect(chatUserComponent.exists()).toBe(true);
});