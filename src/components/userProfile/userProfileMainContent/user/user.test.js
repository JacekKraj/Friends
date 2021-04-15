import { mount } from "enzyme";

import User from "./User";
import * as actions from "./../../../../actions/index";
import { findByTestAttr, storeFactory } from "./../../../../utilities/tests/testsHelperFunctions";

let store;
const setup = (defaultProps, initialState) => {
  store = storeFactory(initialState);
  return mount(<User {...defaultProps} store={store} />);
};

const birthdayDate = { day: 1, month: 1, year: 2000 };

test("shows user info components when props.userData contains thas info", () => {
  const wrapper = setup({
    userData: { profileDescription: "description", gender: "gender", home: "home", job: "job", birthdayDate },
  });
  const userInfoComponents = findByTestAttr(wrapper, "user-info-component");
  const description = findByTestAttr(wrapper, "profile-description");
  expect(userInfoComponents.length).toBe(4);
  expect(description.exists()).toBe(true);
});

test("shows 'Update profile' when type is current", () => {
  const wrapper = setup({ userData: { type: "current", birthdayDate } });
  const profileButton = findByTestAttr(wrapper, "profile-button");
  expect(profileButton.text()).toEqual("Update profile");
});

test("shows 'Follow' when type is unfollowed", () => {
  const wrapper = setup({ userData: { type: "unfollowed", birthdayDate } });
  const profileButton = findByTestAttr(wrapper, "profile-button");
  expect(profileButton.text()).toEqual("Follow");
});

test("shows 'Unfollow' when type is followed", () => {
  const wrapper = setup({ userData: { type: "followed", birthdayDate } });
  const profileButton = findByTestAttr(wrapper, "profile-button");
  expect(profileButton.text()).toEqual("Unfollow");
});

// test('changes button text to "unfollow" after clicking follow button', () => {
//   const wrapper = setup({ userData: { type: "unfollowed", birthdayDate, modifiedEmail: "testtestcom" } });
//   store.dispatch(actions.setFollowedUsers("testtestcom", ["testtestcom"], "unfollowedUsers", "followedUsers"));
//   wrapper.setProps();
//   console.log(wrapper.debug());
// });

test("shows spinner when there is no userData", () => {
  const wrapper = setup({ userData: {} });
  const spinner = findByTestAttr(wrapper, "component-spinner");
  expect(spinner.exists()).toBe(true);
});
