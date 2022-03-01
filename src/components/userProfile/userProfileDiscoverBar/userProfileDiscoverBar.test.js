import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { storeFactory, findByTestAttr } from '../../../utilities/tests/testsHelperFunctions';
import UserProfileDiscoverBar from './UserProfileDiscoverBar';
import { userData, followedUserData, unfollowedUserData } from './../../../utilities/tests/reduxStoreObjects';

const setup = () => {
  const initialState = {
    userData: {
      ...userData.userData,
      followedUsers: [followedUserData],
      unfollowedUsers: [unfollowedUserData],
    },
  };

  const defaultProps = {
    followedUsersEmails: ['testtest1wppl', 'testtest2wppl'],
  };

  const store = storeFactory(initialState);

  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfileDiscoverBar {...defaultProps} />
      </BrowserRouter>
    </Provider>
  );
};

describe('<UserProfileDiscoverBar />', () => {
  test('displays users on not a current user profile discover bar with apropriate buttons, to follow and to unfollow, depending on current user followed users', () => {
    const wrapper = setup();
    const followedUser = findByTestAttr(wrapper, 'component-friend-followed');
    const unfollowedUser = findByTestAttr(wrapper, 'component-friend-unfollowed');
    expect(followedUser.length).toEqual(1);
    expect(unfollowedUser.length).toEqual(1);
  });
});
