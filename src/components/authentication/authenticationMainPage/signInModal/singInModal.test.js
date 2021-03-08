import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";

import { formikFindByInputName, storeFactory, findByTestAttr } from "./../../../../utilities/tests/testsHelperFunctions";
import SignInModal from "./SignInModal";
import * as actions from "./../../../../actions/index";

let store;

const setup = (initialState) => {
  const props = {
    show: true,
  };
  store = storeFactory(initialState);
  return mount(<SignInModal {...props} store={store} />);
};

describe("sign in inputs typing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });
  test("changes email input content on change", () => {
    const emailInput = formikFindByInputName(wrapper, "email");
    act(() => {
      emailInput.simulate("change", { target: { name: "email", value: "asd@wp.pl" } });
    });
    expect(emailInput.instance().value).toEqual("asd@wp.pl");
  });

  test("changes password input content on change", () => {
    const emailInput = formikFindByInputName(wrapper, "password");
    act(() => {
      emailInput.simulate("change", { target: { name: "password", value: "asdasd" } });
    });
    expect(emailInput.instance().value).toEqual("asdasd");
  });
});

describe("spinner visibility", () => {
  describe("showing spinner", () => {
    test("shows spinner on authenticateStart", () => {
      const wrapper = setup();
      store.dispatch(actions.authenticationStart());
      wrapper.setProps();
      const spinner = findByTestAttr(wrapper, "component-spinner");
      expect(spinner.exists()).toBe(true);
    });
  });

  describe("hiding spinner", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { auth: { loading: true } };
      wrapper = setup(initialState);
    });
    test("hides spinner on authenticationEnd", () => {
      store.dispatch(actions.authenticationEnd());
      wrapper.setProps();
      const spinner = findByTestAttr(wrapper, "component-spinner");
      expect(spinner.exists()).toBe(false);
    });
    test("hides spinner on authenticationFail", () => {
      store.dispatch(actions.authenticationFail());
      wrapper.setProps();
      const spinner = findByTestAttr(wrapper, "component-spinner");
      expect(spinner.exists()).toBe(false);
    });
  });
});
