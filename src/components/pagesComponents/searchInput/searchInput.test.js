import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import SearchInput from "./SearchInput";
import { storeFactory, findByTestAttr } from "./../../../utilities/tests/testsHelperFunctions";

const setup = (initialState) => {
  const store = storeFactory(initialState);
  return mount(
    <BrowserRouter>
      <SearchInput store={store} />
    </BrowserRouter>
  );
};
let wrapper, input;
beforeEach(() => {
  wrapper = setup({ userData: { followedUsers: [{ modifiedEmail: "testwppl", name: "Test Test", birthdayDate: {} }], unfollowedUsers: [] } });
  input = wrapper.find("input");
});

afterEach(() => {
  wrapper.unmount();
});

test("doesn't show auto complete when input is empty", () => {
  const noMatchingUsersInfo = findByTestAttr(wrapper, "no-users-info");
  expect(noMatchingUsersInfo.exists()).toBe(true);
});

test("shows users in autocomplete when they match while typing in input", () => {
  input.simulate("change", { target: { value: "test" } });
  const userName = findByTestAttr(wrapper, "user-name").first();
  expect(userName.text()).toEqual("Test Test");
});

test("doesn't show users in autocomplete when they don't match while typing in input", () => {
  input.simulate("change", { target: { value: "tet" } });
  const noMatchingUsersInfo = findByTestAttr(wrapper, "no-users-info");
  expect(noMatchingUsersInfo.text()).toEqual("There are no matching users for this keyword.");
});
