import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import App from './../App';
import { findByTestAttr, storeFactory } from './../utilities/tests/testsHelperFunctions';
import { userData, currentUserPosts } from './../utilities/tests/reduxStoreObjects';
import * as actions from './../actions';

jest.mock('./../utilities/hooks/useGetPosts.js', () => ({
  useGetPosts: () => [{ author: 'jacekkrajewski12wppl', index: 1, hasUrl: false, url: null, text: 'asd', creationTime: 12346789 }],
}));

let store;
const setup = (initialState, route) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe('<ModalMenager />', () => {
  const checkModalAndBackdropExistance = (modalType, wrapper) => {
    let modal = findByTestAttr(wrapper, `${modalType}-modal`);
    let backdrop = findByTestAttr(wrapper, 'component-backdrop');
    expect(modal.exists()).toBeTruthy();
    expect(backdrop.exists()).toBeTruthy();
    backdrop.simulate('click');
    modal = findByTestAttr(wrapper, `${modal}-modal`);
    backdrop = findByTestAttr(wrapper, 'component-backdrop');
    expect(modal.exists()).toBeFalsy();
    expect(backdrop.exists()).toBeFalsy();
  };

  describe('authentication modal', () => {
    let wrapper;
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
    };

    beforeEach(() => {
      const setStateMock = jest.fn();
      const loadingUseStateMock = () => [false, setStateMock];
      jest.spyOn(React, 'useState').mockImplementationOnce(loadingUseStateMock);

      wrapper = setup(initialState, '/');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
    test('shows sign in modal and backdrop on clicking sign in button, and hides on clicking backdrop', () => {
      const signInButton = findByTestAttr(wrapper, 'sign-in-button');
      signInButton.simulate('click');
      checkModalAndBackdropExistance('component-sign-in', wrapper);
    });
    test('shows sign up modal and backdrop on clicking sign up button, and hides on clicking backdrop', () => {
      const signInButton = findByTestAttr(wrapper, 'sign-up-button');
      signInButton.simulate('click');
      checkModalAndBackdropExistance('component-sign-up', wrapper);
    });
  });

  describe('post edition modal', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
      },
      ...userData,
      posts: {
        usersPosts: {
          ...currentUserPosts,
        },
        isNewPostLoading: false,
        isGetPostsLoading: false,
        isUpdatePostLoading: false,
      },
    };

    test('shows post edition modal and backdrop on clicking edit post button, and hides on clicking backdrop', () => {
      const setStateMock = jest.fn();
      const loadingUseStateMock = () => [false, setStateMock];
      jest.spyOn(React, 'useState').mockImplementationOnce(loadingUseStateMock);
      const wrapper = setup(initialState, '/');
      store.dispatch(actions.setIsGetPostsLoading(false));
      wrapper.update();
      const postEditionIcon = findByTestAttr(wrapper, 'post-edition-icon').first();
      postEditionIcon.simulate('click');
      const editBtn = findByTestAttr(wrapper, 'edit-btn');
      editBtn.simulate('click');
      checkModalAndBackdropExistance('component-post-edition', wrapper);
      jest.restoreAllMocks();
    });
  });

  describe('update profile modal', () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
      },
      ...userData,
      posts: {
        usersPosts: {
          ...currentUserPosts,
        },
      },
    };
    test('shows update profile modal and backdrop on clicking update profile button, and hides on clicking backdrop', () => {
      const setStateMock = jest.fn();
      const loadingUseStateMock = () => [false, setStateMock];
      jest.spyOn(React, 'useState').mockImplementationOnce(loadingUseStateMock);
      const wrapper = setup(initialState, '/users?user=jacekkrajewski12wppl');
      const profileButton = findByTestAttr(wrapper, 'profile-button');
      profileButton.simulate('click');
      checkModalAndBackdropExistance('component-update-profile', wrapper);
      jest.restoreAllMocks();
    });
  });
});
