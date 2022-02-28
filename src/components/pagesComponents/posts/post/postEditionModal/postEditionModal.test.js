import React from 'react';
import { mount } from 'enzyme';

import PostEditionModal from './PostEditionModal';
import { storeFactory, findByTestAttr } from './../../../../../utilities/tests/testsHelperFunctions';

const setup = (initialState) => {
  const store = storeFactory(initialState);
  return mount(<PostEditionModal store={store} />);
};

const initialState = {
  posts: { isUpdatePostLoading: false },
  modals: {
    props: {
      url: 'url.png',
      text: 'text',
      creationTime: 123456789,
      index: 1,
      author: 'jacekkrajewski12wppl',
      hasUrl: true,
    },
  },
};

const typeInTextArea = (wrapper, text) => {
  const textarea = findByTestAttr(wrapper, 'textarea');
  textarea.simulate('change', { target: { value: text } });
  wrapper.update();
};

describe('<PostEditionModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(initialState, {});
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('shows image when url props is not null', () => {
    const imgContainer = findByTestAttr(wrapper, 'image-container');
    expect(imgContainer.exists()).toBe(true);
  });

  test('shows spinner on submiting changes', () => {
    typeInTextArea(wrapper, 'text2');
    const form = findByTestAttr(wrapper, 'post-edition-form');
    form.simulate('submit');
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.exists()).toBe(true);
  });

  describe('button enability', () => {
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

    test('button is enabled after typing, and then disabled again after removing changes', () => {
      typeInTextArea(wrapper, 'text2');
      let button = findByTestAttr(wrapper, 'submit-button');
      expect(button.props().disabled).toEqual(false);
      typeInTextArea(wrapper, 'text');
      button = findByTestAttr(wrapper, 'submit-button');
      expect(button.props().disabled).toEqual(true);
    });
  });
});
