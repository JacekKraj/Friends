import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { storeFactory, findByTestAttr } from './../../../utilities/tests/testsHelperFunctions';
import UserProfileMainContent from './UserProfileMainContent';
import { currentUserPosts, anotherUserPosts, userData, birthdayDate } from '../../../utilities/tests/reduxStoreObjects';
import * as actions from './../../../actions/index';
import * as actionTypes from './../../../actions/actionsTypes';

const defaultProps = {
  user: { type: 'current', birthdayDate, modifiedEmail: 'jacekkrajewski12wppl' },
};

let store;

const setup = (initialState) => {
  store = storeFactory({ ...initialState, ...userData });

  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfileMainContent {...defaultProps} />
      </BrowserRouter>
    </Provider>
  );
};

describe('<UserProfileMainContent />', () => {
  let wrapper;

  const initialState = {
    posts: {
      usersPosts: {
        ...currentUserPosts,
        ...anotherUserPosts,
      },
      isGetPostsLoading: false,
    },
  };

  test('shows addPostModule when user is of type current', () => {
    wrapper = setup(initialState);
    const addPostModule = findByTestAttr(wrapper, 'add-post-module-component');
    expect(addPostModule.exists()).toBe(true);
  });

  test('displays only profile owner posts', () => {
    wrapper = setup(initialState);
    const posts = findByTestAttr(wrapper, 'post-component');
    expect(posts.length).toBe(1);
    const postText = findByTestAttr(wrapper, 'text');
    expect(postText.text()).toEqual('text1');
  });

  test('shows new post after dispatching createUserPost action', () => {
    const wrapper = setup(initialState);
    const post = {
      text: 'test',
      creationTime: 123456789,
      hasUrl: false,
      url: null,
    };
    store.dispatch(actions.createUserPost(post, 'jacekkrajewski12wppl', 2));
    wrapper.setProps();
    const posts = findByTestAttr(wrapper, 'post-component');
    expect(posts.length).toBe(2);
  });

  test('removes post after dispatching remove post action', () => {
    const wrapper = setup(initialState);
    store.dispatch({ type: actionTypes.REMOVE_POST, user: 'jacekkrajewski12wppl', index: 1 });
    wrapper.setProps();
    const posts = findByTestAttr(wrapper, 'post-component');
    expect(posts.length).toBe(0);
  });
});
