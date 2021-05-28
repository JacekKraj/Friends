import { mount } from "enzyme";
import { Provider } from "react-redux";

import User from "./User";
import * as actions from "./../../../../actions/index";
import { findByTestAttr, storeFactory, formikFindByInputName } from "./../../../../utilities/tests/testsHelperFunctions";

let store;
const setup = (defaultProps, initialState) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <User {...defaultProps} />
    </Provider>
  );
};

const birthdayDate = { day: 1, month: 1, year: 2000 };

test("shows user info components when props.userData contains thas info", () => {
  const wrapper = setup({
    userData: { personalInfo: { profileDescription: "description", gender: "gender", home: "home", work: "work" }, birthdayDate },
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

test("shows spinner when there is no userData", () => {
  const wrapper = setup({ userData: {} });
  const spinner = findByTestAttr(wrapper, "component-spinner");
  expect(spinner.exists()).toBe(true);
});

describe("UpdateProfileModal interaction", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      userData: {
        type: "current",
        birthdayDate,
        personalInfo: { profileDescription: "description", gender: "gender", home: "home", work: "work" },
        birthdayDate,
      },
    });
    const profileButton = findByTestAttr(wrapper, "profile-button");
    profileButton.simulate("click");
  });

  afterEach(() => {
    wrapper.unmount();
  });
  test("shows update profille modal on clicking button when user type is 'current'", () => {
    const updateProfileModal = findByTestAttr(wrapper, "component-update-profile-modal");
    expect(updateProfileModal.exists()).toBe(true);
  });
  test("hides modal after clicking backdrop", () => {
    const backdrop = findByTestAttr(wrapper, "component-backdrop");
    backdrop.simulate("click");
    const updateProfileModal = findByTestAttr(wrapper, "component-update-profile-modal");
    expect(updateProfileModal.exists()).toBe(false);
  });
  test("display apropriate text if exists, in text inputs", () => {
    const descriptionInput = formikFindByInputName(wrapper, "profileDescription");
    expect(descriptionInput.prop("value")).toEqual("description");
    const workInput = formikFindByInputName(wrapper, "work");
    expect(workInput.prop("value")).toEqual("work");
    const genderInput = formikFindByInputName(wrapper, "gender");
    expect(genderInput.prop("value")).toEqual("gender");
    const homeInput = formikFindByInputName(wrapper, "home");
    expect(homeInput.prop("value")).toEqual("home");
  });
});
