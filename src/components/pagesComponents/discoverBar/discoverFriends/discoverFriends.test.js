import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import DiscoverFriends from "./DiscoverFriends";
import { findByTestAttr, storeFactory } from "./../../../../utilities/tests/testsHelperFunctions";

const setup = (initialState) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <DiscoverFriends />
      </BrowserRouter>
    </Provider>
  );
};

test("shows no users info when unfollowed users array is empty", () => {
  const wrapper = setup({ userData: { unfollowedUsers: [], currentUser: { modifiedEmail: "" } } });
  const noUsersInfo = findByTestAttr(wrapper, "no-users-info");
  expect(noUsersInfo.text()).toEqual("There are no more people to follow right now.");
});

test("shows an user when unfollowed useres array is no empty", () => {
  const wrapper = setup({
    userData: { unfollowedUsers: [{ modifiedEmail: "testwppl", name: "Test Test", birthdayDate: {} }], currentUser: { modifiedEmail: "" } },
  });
  const friendComponent = findByTestAttr(wrapper, "friend-component");
  expect(friendComponent.exists()).toBe(true);
});
