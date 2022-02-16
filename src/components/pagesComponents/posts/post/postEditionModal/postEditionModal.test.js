import React from 'react';
import { mount } from 'enzyme';

import PostEditionModal from './PostEditionModal';
import { storeFactory, findByTestAttr } from './../../../../../utilities/tests/testsHelperFunctions';
import * as actions from './../../../../../actions/index';

let store;
const setup = (initialState, defaultProps) => {
  store = storeFactory(initialState);
  return mount(<PostEditionModal store={store} {...defaultProps} />);
};

const defaultProps = { post: { url: 'url.url', text: 'text' } };

const initialState = { posts: { isUpdatePostLoading: false } };

let wrapper;

beforeEach(() => {
  wrapper = setup(initialState, defaultProps);
});

afterEach(() => {
  wrapper.unmount();
});

test('shows image when url props is not null', () => {
  const imgContainer = findByTestAttr(wrapper, 'image-container');
  expect(imgContainer.exists()).toBe(true);
});

test('shows spinner on dispatch setUpadtePostLoading action', () => {
  store.dispatch(actions.setIsUpdatePostLoading(true));
  wrapper.setProps();
  const spinner = findByTestAttr(wrapper, 'component-spinner');
  expect(spinner.exists()).toBe(true);
});

describe('button disability', () => {
  test('button is initially disabled', () => {
    const button = findByTestAttr(wrapper, 'submit-button');
    expect(button.props().disabled).toEqual(true);
  });
  test('button is enabled after removing picture', () => {
    const removeIcon = findByTestAttr(wrapper, 'remove-icon').first();
    removeIcon.simulate('click');
    const button = findByTestAttr(wrapper, 'submit-button');
    expect(button.props().disabled).toEqual(false);
  });

  describe('typing in textarea', () => {
    let textarea;
    beforeEach(() => {
      textarea = findByTestAttr(wrapper, 'textarea');
      textarea.simulate('change', { target: { value: 'text2' } });
      wrapper.update();
    });
    test('button is enabled after typing', () => {
      const button = findByTestAttr(wrapper, 'submit-button');
      expect(button.props().disabled).toEqual(false);
    });

    test("button is disabled again after removing typed text from default post's text", () => {
      textarea.simulate('change', { target: { value: 'text' } });
      wrapper.update();
      const button = findByTestAttr(wrapper, 'submit-button');
      expect(button.props().disabled).toEqual(true);
    });
  });
});
