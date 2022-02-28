import { shallow } from 'enzyme';

import SmallScreenNav from './SmallScreenNav';
import { findByTestAttr, storeFactory } from '../../../../utilities/tests/testsHelperFunctions';

let store;
const setup = (initialState) => {
  const store = storeFactory(initialState);
  return shallow(<SmallScreenNav store={store} />)
    .dive()
    .dive();
};

describe('Small Nav Bar visibility', () => {
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
