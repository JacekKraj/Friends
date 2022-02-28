import { shallow } from 'enzyme';

import SmallScreenNav from './SmallScreenDiscoverBar';
import { findByTestAttr, storeFactory } from '../../../../utilities/tests/testsHelperFunctions';

const setup = (initialState) => {
  const store = storeFactory(initialState);
  return shallow(<SmallScreenNav store={store} />)
    .dive()
    .dive();
};

describe('<SmallScreenDiscoverBar />', () => {
  test('discover bar is visible when show is true', () => {
    const wrapper = setup({
      nav: {
        isShownDiscoverBar: true,
      },
    });
    const smallDiscoverBar = findByTestAttr(wrapper, 'small-screen-discover-bar-component');
    expect(smallDiscoverBar.exists()).toBe(true);
  });

  test('discover bar is invisible when show is false', () => {
    const wrapper = setup({
      nav: {
        isShownDiscoverBar: false,
      },
    });
    const smallDiscoverBar = findByTestAttr(wrapper, 'small-screen-discover-bar-component');
    expect(smallDiscoverBar.exists()).toBe(false);
  });
});
