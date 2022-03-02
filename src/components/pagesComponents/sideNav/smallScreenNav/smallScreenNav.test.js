import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import SmallScreenNav from './SmallScreenNav';
import { findByTestAttr, storeFactory } from '../../../../utilities/tests/testsHelperFunctions';

const setup = (initialState) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <SmallScreenNav />
      </BrowserRouter>
    </Provider>
  );
};

describe('<SmallScreenNavBar />', () => {
  test('nav bar is visible when show is true', () => {
    const wrapper = setup({
      nav: {
        isShownNav: true,
      },
    });
    const smallNavBarComponent = findByTestAttr(wrapper, 'small-screen-nav-bar-component');
    expect(smallNavBarComponent.exists()).toBe(true);
  });

  test('nav bar is invisible when show is false', () => {
    const wrapper = setup({
      nav: {
        isShownNav: false,
      },
    });
    const smallNavBarComponent = findByTestAttr(wrapper, 'small-screen-nav-bar-component');
    expect(smallNavBarComponent.exists()).toBe(false);
  });
});
