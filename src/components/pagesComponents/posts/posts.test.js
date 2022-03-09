import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Posts from './Posts';
import { storeFactory, findByTestAttr } from './../../../utilities/tests/testsHelperFunctions';
import { userData } from '../../../utilities/tests/reduxStoreObjects';

const currentUserPost = { author: 'jacekkrajewski12wppl', creationTime: 1615988637142, hasUrl: false, index: '1', text: 'text', url: null };

describe('<Posts />', () => {
  let store, wrapper;
  const setup = (initialState, defaultProps) => {
    store = storeFactory({ ...userData, ...initialState });
    return mount(
      <Provider store={store}>
        <BrowserRouter>
          <Posts {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );
  };

  afterEach(() => {
    wrapper.unmount();
  });

  test("displays 'There are no posts to display' when posts array is empty", () => {
    wrapper = setup(
      { posts: { isGetPostsLoading: false } },
      {
        posts: [],
      }
    );
    const noPostsInfo = findByTestAttr(wrapper, 'no-posts-info');
    expect(noPostsInfo.text()).toEqual('There are no posts to display.');
  });

  test('show spinner when isLoading is true', () => {
    wrapper = setup(
      { posts: { isGetPostsLoading: true } },
      {
        posts: [],
      }
    );
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.exists()).toBe(true);
  });

  test('display one post when posts array is not initially empty', () => {
    wrapper = setup(
      { posts: { isGetPostsLoading: false } },
      {
        posts: [currentUserPost],
      }
    );
    const post = findByTestAttr(wrapper, 'post-component');
    expect(post.exists()).toBe(true);
  });
});
