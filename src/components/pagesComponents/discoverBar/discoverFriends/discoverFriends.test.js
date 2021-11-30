import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import DiscoverFriends from './DiscoverFriends';
import { findByTestAttr, storeFactory } from './../../../../utilities/tests/testsHelperFunctions';

const setup = (initialState, defaultProps) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <DiscoverFriends {...defaultProps} />
      </BrowserRouter>
    </Provider>
  );
};

test('shows no users info in home page when when there is no users to follow', () => {
  const wrapper = setup({ userData: { currentUser: { modifiedEmail: '' } } }, { users: [], location: 'home' });
  const noUsersInfo = findByTestAttr(wrapper, 'no-users-info');
  expect(noUsersInfo.text()).toEqual('There are no more people to follow right now.');
});

test('shows no users info when unfollowed users array is empty', () => {
  const wrapper = setup({ userData: { currentUser: { modifiedEmail: '' } } }, { users: [], location: 'profile' });
  const noUsersInfo = findByTestAttr(wrapper, 'no-users-info');
  expect(noUsersInfo.text()).toEqual("This user hasn't followed anyone yet.");
});

test('shows a user to follow on home page when users array is not empty', () => {
  const wrapper = setup(
    {
      userData: { currentUser: { modifiedEmail: '' }, followedUsers: [] },
    },
    { users: [{ modifiedEmail: 'testwppl', name: 'Test Test', birthdayDate: {} }], location: 'home' }
  );
  const notAFriendComponent = findByTestAttr(wrapper, 'component-friend-unfollowed');
  expect(notAFriendComponent.exists()).toBe(true);
});

test('shows a user to follow and to unfollow on profile page depending on following state', () => {
  const wrapper = setup(
    {
      userData: { currentUser: { modifiedEmail: '' }, followedUsers: [{ modifiedEmail: 'testwppl', name: 'Test Test', birthdayDate: {} }] },
    },
    {
      users: [
        { modifiedEmail: 'testwppl', name: 'Test Test', birthdayDate: {} },
        { modifiedEmail: 'test2wppl', name: 'Test Test', birthdayDate: {} },
      ],
      location: 'profile',
    }
  );
  const notAFriendComponent = findByTestAttr(wrapper, 'component-friend-unfollowed');
  const friendComponent = findByTestAttr(wrapper, 'component-friend-followed');
  expect(notAFriendComponent.exists()).toBe(true);
  expect(friendComponent.exists()).toBe(true);
});
