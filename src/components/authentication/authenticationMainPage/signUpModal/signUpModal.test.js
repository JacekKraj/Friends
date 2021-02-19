import React from "react";
import { formikFindByInputName, formikFindBySelectName } from "./../../../../utilities/tests/testsHelperFunctions";
import { mount } from "enzyme";

import SignUpModal from "./SignUpModal";

describe("sign up inputs", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SignUpModal show={true} />);
  });
  describe("text inputs typing", () => {
    test("changes email input content on change", () => {
      const emailInput = formikFindByInputName(wrapper, "email");
      emailInput.simulate("change", { target: { name: "email", value: "asd@wp.pl" } });
      expect(emailInput.instance().value).toEqual("asd@wp.pl");
    });

    test("changes emailRepeat input content on change", () => {
      const emailInput = formikFindByInputName(wrapper, "emailRepeat");
      emailInput.simulate("change", { target: { name: "emailRepeat", value: "asd@wp.pl" } });
      expect(emailInput.instance().value).toEqual("asd@wp.pl");
    });

    test("changes password input content on change", () => {
      const emailInput = formikFindByInputName(wrapper, "password");
      emailInput.simulate("change", { target: { name: "password", value: "asdasd" } });
      expect(emailInput.instance().value).toEqual("asdasd");
    });

    test("changes passwordRepeat input content on change", () => {
      const emailInput = formikFindByInputName(wrapper, "passwordRepeat");
      emailInput.simulate("change", { target: { name: "passwordRepeat", value: "asdasd" } });
      expect(emailInput.instance().value).toEqual("asdasd");
    });
  });

  describe("select input changing", () => {
    test("changes value of day select input on change", () => {
      const daySelect = formikFindBySelectName(wrapper, "day");
      daySelect.simulate("change", { target: { name: "day", value: 2 } });
      expect(daySelect.instance().value).toEqual("2");
    });

    test("changes value of month select input on change", () => {
      const daySelect = formikFindBySelectName(wrapper, "month");
      daySelect.simulate("change", { target: { name: "month", value: "February" } });
      expect(daySelect.instance().value).toEqual("February");
    });
    test("changes value of month select input on change", () => {
      const daySelect = formikFindBySelectName(wrapper, "year");
      daySelect.simulate("change", { target: { name: "year", value: 2020 } });
      expect(daySelect.instance().value).toEqual("2020");
    });
  });
});
