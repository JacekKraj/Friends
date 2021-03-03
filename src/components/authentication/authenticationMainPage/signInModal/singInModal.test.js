import { mount } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";

import { formikFindByInputName } from "./../../../../utilities/tests/testsHelperFunctions";
import SignInModal from "./SignInModal";

const setup = () => {
  const props = {
    show: true,
  };
  return mount(<SignInModal {...props} />);
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
