import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AddPostModule from './AddPostModule';
import { storeFactory, findByTestAttr } from '../../../utilities/tests/testsHelperFunctions';
import * as actions from '../../../actions/index';
import { userData, currentUserNoPosts } from './../../../utilities/tests/reduxStoreObjects';

describe('<AddPostModule />', () => {
  let store;

  const setup = (initialState) => {
    store = storeFactory(initialState);

    return mount(
      <Provider store={store}>
        <BrowserRouter>
          <AddPostModule />
        </BrowserRouter>
      </Provider>
    );
  };

  describe('textarea', () => {
    test('changes textarea value on typing', () => {
      const wrapper = setup();
      const textarea = wrapper.find('textarea');
      textarea.simulate('change', { target: { value: 'text' } });
      expect(wrapper.find('textarea').props().value).toEqual('text');
      wrapper.unmount();
    });
  });

  describe('showing spinner', () => {
    let wrapper;

    const submitPostForm = (wrapper) => {
      const textarea = findByTestAttr(wrapper, 'add-post-module-textarea');
      textarea.simulate('change', { target: { value: 'text' } });
      const form = findByTestAttr(wrapper, 'add-post-module-form');
      form.simulate('submit');
    };

    beforeEach(() => {
      const initialState = {
        ...userData,
        posts: {
          usersPosts: {
            ...currentUserNoPosts,
          },
          isGetPostsLoading: false,
        },
      };

      wrapper = setup(initialState);

      submitPostForm(wrapper);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    test('shows spinner after submiting add post form', () => {
      const spinner = findByTestAttr(wrapper, 'component-spinner');
      expect(spinner.exists()).toBe(true);
    });
    test('hides spinner after dispatch setLoading(false)', () => {
      store.dispatch(actions.setIsNewPostLoading(false));
      wrapper.setProps();
      const spinner = findByTestAttr(wrapper, 'component-spinner');
      expect(spinner.exists()).toBe(false);
    });
  });

  const createUseReducerMock = (image) => {
    const mockUseReducer = () => [{ text: 'text', image, cursorPostion: 0 }, jest.fn()];
    jest.spyOn(React, 'useReducer').mockImplementationOnce(mockUseReducer);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('displaying image', () => {
    test("shows image when state.images isn't an empty array", () => {
      createUseReducerMock({ url: 'img.png' });
      const wrapper = setup();
      const image = findByTestAttr(wrapper, 'image');
      expect(image.exists()).toBe(true);
    });

    test('does not show image when state.images is empty array', () => {
      createUseReducerMock({});
      const wrapper = setup();
      const image = findByTestAttr(wrapper, 'image');
      expect(image.exists()).toBe(false);
    });
  });
});
