import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import SearchInput from './SearchInput';
import { storeFactory, findByTestAttr } from './../../../utilities/tests/testsHelperFunctions';

const setup = (initialState) => {
  const store = storeFactory(initialState);
  return mount(
    <BrowserRouter>
      <Provider store={store}>
        <SearchInput />
      </Provider>
    </BrowserRouter>
  );
};

describe('<SearchInput />', () => {
  let wrapper, input;
  beforeEach(() => {
    wrapper = setup({ userData: { followedUsers: [{ modifiedEmail: 'testwppl', name: 'Test Test', birthdayDate: {} }], unfollowedUsers: [] } });
    input = wrapper.find('input');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test("doesn't show autocomplete when input is empty", () => {
    const noMatchingUsersInfo = findByTestAttr(wrapper, 'no-users-info');
    expect(noMatchingUsersInfo.exists()).toBe(false);
  });

  test("doesn't show autocomplete when input isn't empty but has no focus", () => {
    input.simulate('change', { target: { value: 'test' } });
    const noMatchingUsersInfo = findByTestAttr(wrapper, 'no-users-info');
    expect(noMatchingUsersInfo.exists()).toBe(false);
  });

  test('shows users in autocomplete when they match while typing in focused input', () => {
    input.simulate('change', { target: { value: 'test' } });
    input.simulate('focus');
    const userName = findByTestAttr(wrapper, 'user-name').first();
    expect(userName.text()).toEqual('Test Test');
  });

  test('shows no matching users info while typing in focused input', () => {
    input.simulate('change', { target: { value: 'tet' } });
    input.simulate('focus');
    const noMatchingUsersInfo = findByTestAttr(wrapper, 'no-users-info');
    expect(noMatchingUsersInfo.text()).toEqual('There are no matching users for this keyword.');
  });
});
