import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import MessagesArea from './MessagesArea';
import { storeFactory, findByTestAttr } from './../../../../utilities/tests/testsHelperFunctions';

const setup = (defaultProps) => {
  const initialState = {
    userData: {
      currentUser: {
        modifiedEmail: 'jacekkrajewski12wppl',
      },
    },
  };

  const store = storeFactory(initialState);

  return mount(
    <Provider store={store}>
      <MessagesArea {...defaultProps} />
    </Provider>
  );
};

describe('<MessagesArea />', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });
  test('shows spinner when messages prop is empty', () => {
    const defaultProps = { isForeignUser: false, textedUserModifiedEmail: 'testtest1wppl' };
    const wrapper = setup(defaultProps);
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.exists()).toBeTruthy();
  });
  test('shows two messages with different style when messages prop is not empty', () => {
    const messages = [
      { createdAt: {}, from: 'jacekkrajewski12wppl', test: 'text', id: 'id1' },
      { createdAt: {}, from: 'testtest1wppl', test: 'text', id: 'id2' },
    ];
    const defaultProps = { messages, isForeignUser: false, textedUserModifiedEmail: 'testtest1wppl' };
    const wrapper = setup(defaultProps);
    const message = findByTestAttr(wrapper, 'component-message');
    expect(message.first().hasClass('answer')).toBeFalsy();
    expect(message.last().hasClass('answer')).toBeTruthy();
  });
});
