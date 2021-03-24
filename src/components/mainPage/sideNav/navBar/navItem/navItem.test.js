import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { act } from "react-dom/test-utils";

import NavItem from "./NavItem";

let testLocation;

const setup = (props) => {
  return mount(
    <MemoryRouter history={history}>
      <NavItem {...props} />
      <Route
        path="*"
        render={({ _, location }) => {
          // testHistory = history;
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );
};

test("", () => {});
