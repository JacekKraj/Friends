import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import ChatPage from './ChatPage';
import { findByTestAttr, storeFactory } from './../../utilities/tests/testsHelperFunctions';
import { userData, followedUserData, unfollowedUserData } from './../../utilities/tests/reduxStoreObjects';

const setup = (search) => {
  const initialState = {
    userData: {
      ...userData.userData,
      followedUsers: [followedUserData],
      unfollowedUsers: [unfollowedUserData],
    },
    chat: {
      chatNotifications: [],
    },
  };
  const store = storeFactory(initialState);

  return mount(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/chat',
            search: `to=${search}`,
          },
        ]}
      >
        <ChatPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('<ChatPage />', () => {
  test('shows chat when email in search param is correct', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const wrapper = setup('testtest1wppl');
    const chat = findByTestAttr(wrapper, 'component-chat');
    expect(chat.exists()).toBeTruthy();
  });
  test('shows chat instructions when email in search param is incorrect', () => {
    const wrapper = setup('incorrectemail');
    const chatInstruction = findByTestAttr(wrapper, 'component-chat-instruction');
    expect(chatInstruction.exists()).toBeTruthy();
  });
  test('displays blocked chat info, when emial in search param belongs to unfollowed user', () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const wrapper = setup('testtest2wppl');
    const blockedChatInfo = findByTestAttr(wrapper, 'component-blocked-chat-info');
    expect(blockedChatInfo.exists()).toBeTruthy();
  });
});
