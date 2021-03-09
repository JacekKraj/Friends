import { shallow } from "enzyme";

import SmallScreenNav from "./SmallScreenNav";
import { findByTestAttr } from "../../../../utilities/tests/testsHelperFunctions";

const setup = (props) => {
  return shallow(<SmallScreenNav {...props} />);
};

describe("Small Nav Bar visibility", () => {
  test("nav bar visible when show is true", () => {
    const wrapper = setup({ show: true });
    const smallNavBarComponent = findByTestAttr(wrapper, "small-screen-nav-bar-component");
    expect(smallNavBarComponent.exists()).toBe(true);
  });

  test("nav bar invisible when show is false", () => {
    const wrapper = setup({ show: false });
    const smallNavBarComponent = findByTestAttr(wrapper, "small-screen-nav-bar-component");
    expect(smallNavBarComponent.exists()).toBe(false);
  });
});
