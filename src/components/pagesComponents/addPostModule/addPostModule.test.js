import React from 'react';
import { shallow, mount } from 'enzyme';

import AddPostModule from './AddPostModule';
import { storeFactory, findByTestAttr } from '../../../utilities/tests/testsHelperFunctions';
import * as actions from '../../../actions/index';

let store;

describe('textarea', () => {
  let wrapper;

  beforeEach(() => {
    store = storeFactory();
    wrapper = shallow(<AddPostModule store={store} />)
      .dive()
      .dive();
  });
  test('changes textarea value on typing', () => {
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', { target: { value: 'text' } });
    expect(wrapper.find('textarea').props().value).toEqual('text');
  });
});

describe('spinner', () => {
  let wrapper;
  const setup = (initialState) => {
    store = storeFactory(initialState);
    return mount(<AddPostModule store={store} />);
  };
  afterEach(() => {
    wrapper.unmount();
  });
  test('shows spinner after dispatch setLoading(true)', () => {
    wrapper = setup();
    store.dispatch(actions.setIsNewPostLoading(true));
    wrapper.setProps();
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.exists()).toBe(true);
  });
  test('hides spinner after dispatch setLoading(false)', () => {
    wrapper = setup({ posts: { loading: true } });
    store.dispatch(actions.setIsNewPostLoading(false));
    wrapper.setProps();
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.exists()).toBe(false);
  });
});

const createUseReducerMock = (image) => {
  const mockUseReducer = jest.fn().mockReturnValue([{ text: 'text', image }, jest.fn()]);
  React.useReducer = mockUseReducer;
};

describe('displays image', () => {
  let wrapper;
  const setup = (images) => {
    createUseReducerMock(images);
    const store = storeFactory();
    return mount(<AddPostModule store={store} />);
  };
  afterEach(() => {
    wrapper.unmount();
  });
  test("shows image when state.images isn't an empty array", () => {
    wrapper = setup({ url: 'img.png' });
    const image = findByTestAttr(wrapper, 'image');
    expect(image.exists()).toBe(true);
  });

  test('does not show image when state.images is empty array', () => {
    wrapper = setup({});
    const image = findByTestAttr(wrapper, 'image');
    expect(image.exists()).toBe(false);
  });
});
