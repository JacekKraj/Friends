import { mount } from "enzyme";
import React from "react";

import { formikFindByInputName } from "./../../../../utilities/tests/testsHelperFunctions";
import SignInModal from "./SignInModal";

describe("sign in inputs typing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SignInModal show={true} />);
  });
  test("changes email input content on change", () => {
    const emailInput = formikFindByInputName(wrapper, "email");
    emailInput.simulate("change", { target: { name: "email", value: "asd@wp.pl" } });
    expect(emailInput.instance().value).toEqual("asd@wp.pl");
  });

  test("changes password input content on change", () => {
    const emailInput = formikFindByInputName(wrapper, "password");
    emailInput.simulate("change", { target: { name: "password", value: "asdasd" } });
    expect(emailInput.instance().value).toEqual("asdasd");
  });
});
