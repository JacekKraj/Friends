import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";

import { User } from "./User";
import { findByTestAttr } from "./../../../../../utilities/tests/testsHelperFunctions";

const setup = (defaultProps) => {
  return mount(
    <BrowserRouter>
      <User {...defaultProps} />
    </BrowserRouter>
  );
};

describe("dispatches actions on clicking buttons", () => {
  const mockUnfollowUser = jest.fn();
  const mockFollowUser = jest.fn();
  const setupProps = {
    currentUserModifiedEmail: "testtestcom",
    name: "user",
    modifiedEmail: "userusercom",
    onFollowUser: mockFollowUser,
    onUnfollowUser: mockUnfollowUser,
  };

  test("dispatches follow action with apropriate arguments", () => {
    const wrapper = setup({ ...setupProps, toFollow: true, followedUsersEmails: [] });
    const button = findByTestAttr(wrapper, "follow-button");
    button.simulate("click");
    expect(mockFollowUser).toHaveBeenCalledWith("userusercom", "testtestcom", []);
  });

  test("dispatches unfollow action with apropriate arguments", () => {
    const wrapper = setup({ ...setupProps, toFollow: false, followedUsersEmails: ["userusercom"] });
    const button = findByTestAttr(wrapper, "follow-button");
    button.simulate("click");
    expect(mockUnfollowUser).toHaveBeenCalledWith("userusercom", "testtestcom", ["userusercom"]);
  });
});