import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { storeFactory, findByTestAttr } from './../../../utilities/tests/testsHelperFunctions';
import UserProfileMainContent from './UserProfileMainContent';
import * as actions from './../../../actions/index';

let store;

const setup = (initialState, defaultProps) => {
  store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfileMainContent {...defaultProps} />
      </BrowserRouter>
    </Provider>
  );
};

describe('posts exists initially', () => {
  let wrapper, initialState, defaultProps;
  beforeAll(() => {
    initialState = {
      posts: {
        usersPosts: {
          jacekkrajewski12wppl: {
            posts: {
              1: {
                author: { name: 'name', modifiedEmail: 'jacekkrajewski12wppl' },
                post: { creationTime: 1615988637142, index: 1, name: 'jacekkrajewski12wppl', text: 'text1' },
              },
            },
            totalPostsCreated: 1,
          },
          testtestwppl: {
            posts: {
              1: {
                author: { name: 'name', modifiedEmail: 'testtestwppl' },
                post: { creationTime: 1615988637142, index: 1, name: 'testtestwppl', text: 'text2' },
              },
            },
            totalPostsCreated: 1,
          },
        },
        isGetPostsLoading: false,
      },
      userData: {
        currentUser: {
          modifiedEmail: 'jacekkrajewski12wppl',
        },
        followedUsers: [],
        unfollowedUsers: [],
      },
    };

    defaultProps = {
      user: { type: 'current', birthdayDate: { day: 1, month: 1, year: 2000 }, modifiedEmail: 'jacekkrajewski12wppl' },
    };
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('shows addPostModule when user is of type current', () => {
    wrapper = setup(initialState, defaultProps);
    const addPostModule = findByTestAttr(wrapper, 'add-post-module-component');
    expect(addPostModule.exists()).toBe(true);
  });

  test('displays only profile owner posts', (done) => {
    const displayUserPosts = async () => {
      try {
        wrapper = await setup(initialState, defaultProps);
        const posts = findByTestAttr(wrapper, 'post-component');
        expect(posts.length).toBe(1);
        const postText = findByTestAttr(wrapper, 'text');
        expect(postText.text()).toEqual('text1');
        done();
      } catch {
        done();
      }
    };

    displayUserPosts();
  });
});

describe('0 posts exists initially', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      posts: {
        usersPosts: {},
        isGetPostsLoading: false,
      },
      userData: {
        currentUser: {
          modifiedEmail: 'jacekkrajewski12wppl',
        },
        followedUsers: [],
        unfollowedUsers: [],
      },
    };

    wrapper = setup(initialState, {
      user: { type: 'current', birthdayDate: { day: 1, month: 1, year: 2000 }, modifiedEmail: 'jacekkrajewski12wppl' },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('add post after dispatching createUserPost action creator', (done) => {
    const newPost = {
      author: { name: 'name', modifiedEmail: 'jacekkrajewski12wppl' },
      post: { creationTime: 1615988637142, index: 1, name: 'jacekkrajewski12wppl', text: 'text' },
    };

    const addNewPost = async () => {
      try {
        await store.dispatch(actions.createUserPost(newPost, 1));
        wrapper.setProps();
        const post = findByTestAttr(wrapper, 'post-component');
        expect(post.exists()).toBe(true);
        done();
      } catch {
        done();
      }
    };

    addNewPost();
  });
});
