import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { findByTestAttr } from "./../../../utilities/tests/testsHelperFunctions";
import AuthenticationMainPage from "./AuthenticationMainPage";
import { storeFactory } from "./../../../utilities/tests/testsHelperFunctions";

const setup = () => {
  const store = storeFactory();
  return mount(
    <Provider store={store}>
      <AuthenticationMainPage />
    </Provider>
  );
};
describe("backdrop and modals visibility", () => {
  let wrapper, signInButton, signUpButton;

  beforeEach(() => {
    wrapper = setup();
    signUpButton = findByTestAttr(wrapper, "sign-up-button");
    signInButton = findByTestAttr(wrapper, "sign-in-button");
  });

  afterEach(() => {
    wrapper.unmount();
  });
  test("shows backdrop and modal after sign up button click", () => {
    signUpButton.simulate("click");
    const backdrop = findByTestAttr(wrapper, "component-backdrop");
    const signUpModal = findByTestAttr(wrapper, "component-sign-up-modal");
    expect(backdrop.exists()).toBe(true);
    expect(signUpModal.exists()).toBe(true);
  });
  test("shows backdrop and modal after sign in button click", () => {
    signInButton.simulate("click");
    const backdrop = findByTestAttr(wrapper, "component-backdrop");
    const signInModal = findByTestAttr(wrapper, "component-sign-in-modal");
    expect(backdrop.exists()).toBe(true);
    expect(signInModal.exists()).toBe(true);
  });
  test("hides sign up modal and backdrop after backdrop click", () => {
    signUpButton.simulate("click");
    let backdrop = findByTestAttr(wrapper, "component-backdrop");
    backdrop.simulate("click");
    const signUpModal = findByTestAttr(wrapper, "component-sign-up-modal");
    backdrop = findByTestAttr(wrapper, "component-backdrop");
    expect(signUpModal.exists()).toBe(false);
    expect(backdrop.exists()).toBe(false);
  });

  test("hides sign in modal and backdrop after backdrop click", () => {
    signInButton.simulate("click");
    let backdrop = findByTestAttr(wrapper, "component-backdrop");
    backdrop.simulate("click");
    const signInModal = findByTestAttr(wrapper, "component-sign-In-modal");
    backdrop = findByTestAttr(wrapper, "component-backdrop");
    expect(signInModal.exists()).toBe(false);
    expect(backdrop.exists()).toBe(false);
  });
});
