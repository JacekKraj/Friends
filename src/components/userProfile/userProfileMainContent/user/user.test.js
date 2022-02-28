import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import User from './User';
import { findByTestAttr, storeFactory } from './../../../../utilities/tests/testsHelperFunctions';
import { birthdayDate } from './../../../../utilities/tests/reduxStoreObjects';

describe('<User />', () => {
  let store;
  const setup = (defaultProps) => {
    store = storeFactory();
    return mount(
      <BrowserRouter>
        <Provider store={store}>
          <User {...defaultProps} />
        </Provider>
      </BrowserRouter>
    );
  };

  const personalInfo = { profileDescription: 'description', gender: 'gender', home: 'home', work: 'work' };

  test('shows user info components when props.user contains thas info', () => {
    const wrapper = setup({
      user: { personalInfo, birthdayDate },
    });

    const userInfoComponents = findByTestAttr(wrapper, 'user-info-component');
    const description = findByTestAttr(wrapper, 'profile-description');
    expect(userInfoComponents.length).toBe(4);
    expect(description.exists()).toBe(true);
  });

  describe('profile button text', () => {
    test("shows 'Update profile' when type is current", () => {
      const wrapper = setup({ user: { type: 'current', birthdayDate } });
      const profileButton = findByTestAttr(wrapper, 'profile-button');
      expect(profileButton.text()).toEqual('Update profile');
    });

    test("shows 'Follow' when type is unfollowed", () => {
      const wrapper = setup({ user: { type: 'unfollowed', birthdayDate } });
      const profileButton = findByTestAttr(wrapper, 'profile-button');
      expect(profileButton.text()).toEqual('Follow');
    });

    test("shows 'Unfollow' when type is followed", () => {
      const wrapper = setup({ user: { type: 'followed', birthdayDate } });
      const profileButton = findByTestAttr(wrapper, 'profile-button');
      expect(profileButton.text()).toEqual('Unfollow');
    });
  });

  test('shows spinner when there is no user prop', () => {
    const wrapper = setup({ user: {} });
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.exists()).toBe(true);
  });
});
