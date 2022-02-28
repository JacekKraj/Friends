import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import FriendsMainPageContent from './FriendsPageMainContent';
import { storeFactory, findByTestAttr } from './../../../utilities/tests/testsHelperFunctions';
import * as actions from './../../../actions/index';

let store;
const setup = (initialState) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <FriendsMainPageContent />
      </BrowserRouter>
    </Provider>
  );
};

describe('<FriendsPageMainContent />', () => {
  describe('displays users', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({
        userData: {
          followedUsers: [{ modifiedEmail: 'testtest1com', name: 'test test' }],
          unfollowedUsers: [{ modifiedEmail: 'testtest2com', name: 'test2 test2' }],
          currentUser: { followedUsersEmails: ['testtest1com'], modifiedEmail: 'userusercom' },
        },
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    test('displays followed users', () => {
      const user = findByTestAttr(wrapper, 'component-followed-user');
      expect(user.exists()).toBe(true);
    });
    test('displays users to follow', () => {
      const user = findByTestAttr(wrapper, 'component-unfollowed-user');
      expect(user.exists()).toBe(true);
    });
    test("displays second user in 'discover other users' section after dispatching unfollow action", () => {
      const users = {
        newFollowedEmails: [],
        toReduce: 'followedUsers',
        toIncrease: 'unfollowedUsers',
      };
      store.dispatch(actions.setFollowedUsers('testtest2com', users));
      wrapper.setProps();
      const unfollowedUsers = findByTestAttr(wrapper, 'component-unfollowed-user');
      const followedUsers = findByTestAttr(wrapper, 'component-followed-user');
      expect(unfollowedUsers.length).toEqual(2);
      expect(followedUsers.length).toEqual(0);
    });
    test("displays second user in 'friends' section after dispatching follow action", () => {
      const users = {
        newFollowedEmails: ['testtest2com', 'testtest1com'],
        toReduce: 'unfollowedUsers',
        toIncrease: 'followedUsers',
      };
      store.dispatch(actions.setFollowedUsers('testtest2com', users));
      wrapper.setProps();
      const unfollowedUsers = findByTestAttr(wrapper, 'component-unfollowed-user');
      const followedUsers = findByTestAttr(wrapper, 'component-followed-user');
      expect(unfollowedUsers.length).toEqual(0);
      expect(followedUsers.length).toEqual(2);
    });
  });
  describe('displays info', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({
        userData: {
          followedUsers: [],
          unfollowedUsers: [],
          currentUser: { followedUsersEmails: [], modifiedEmail: 'userusercom' },
        },
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    test('displays no followed users info', () => {
      const info = findByTestAttr(wrapper, 'no-users-info').first();
      expect(info.text()).toEqual("You don't follow any other user yet.");
    });
    test('displays no new users info', () => {
      const info = findByTestAttr(wrapper, 'no-users-info').last();
      expect(info.text()).toEqual('You follow all available users right now. Try discovering others later.');
    });
  });
});
