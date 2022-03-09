import React from 'react';

import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import { Provider } from 'react-redux';

import SignUpForm from './SignUpModal';
import { storeFactory, formikFindByInputName, formikFindBySelectName, findByTestAttr } from './../../../../utilities/tests/testsHelperFunctions';
import * as actions from './../../../../actions/index';

describe('<SignUpModal />', () => {
  let store;
  const setup = (initialState) => {
    store = storeFactory(initialState);

    return mount(
      <Provider store={store}>
        <SignUpForm />
      </Provider>
    );
  };

  const changeInputValue = async (name, value, input) => {
    await act(async () => {
      await input.simulate('change', { target: { name: `${name}`, value: `${value}` } });
    });
  };

  describe('sign up inputs', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    afterEach(() => {
      wrapper.unmount();
    });

    describe('text inputs typing', () => {
      test('changes email input value on change', () => {
        const emailInput = formikFindByInputName(wrapper, 'email');
        changeInputValue('email', 'asd@wp.pl', emailInput);
        expect(emailInput.instance().value).toEqual('asd@wp.pl');
      });

      test('changes emailRepeat input value on change', () => {
        const emailRepeat = formikFindByInputName(wrapper, 'emailRepeat');
        changeInputValue('emailRepeat', 'asd@wp.pl', emailRepeat);
        expect(emailRepeat.instance().value).toEqual('asd@wp.pl');
      });

      test('changes name input value on change', () => {
        const name = formikFindByInputName(wrapper, 'name');
        changeInputValue('name', 'Jacek', name);
        expect(name.instance().value).toEqual('Jacek');
      });

      test('changes surname input value on change', () => {
        const surname = formikFindByInputName(wrapper, 'surname');
        changeInputValue('surname', 'Krajewski', surname);
        expect(surname.instance().value).toEqual('Krajewski');
      });

      test('changes password input value on change', () => {
        const password = formikFindByInputName(wrapper, 'password');
        changeInputValue('password', 'asdasd', password);
        expect(password.instance().value).toEqual('asdasd');
      });

      test('changes passwordRepeat input value on change', () => {
        const passwordRepeat = formikFindByInputName(wrapper, 'passwordRepeat');
        changeInputValue('passwordRepeat', 'asdasd', passwordRepeat);
        expect(passwordRepeat.instance().value).toEqual('asdasd');
      });
    });

    describe('select input changing', () => {
      test('changes value of day select input on change', () => {
        const daySelect = formikFindBySelectName(wrapper, 'day');
        changeInputValue('day', 2, daySelect);
        expect(daySelect.instance().value).toEqual('2');
      });

      test('changes value of month select input on change', () => {
        const monthSelect = formikFindBySelectName(wrapper, 'month');
        changeInputValue('month', 'February', monthSelect);
        expect(monthSelect.instance().value).toEqual('February');
      });
      test('changes value of year select input on change', () => {
        const yearSelect = formikFindBySelectName(wrapper, 'year');
        changeInputValue('year', 2020, yearSelect);
        expect(yearSelect.instance().value).toEqual('2020');
      });
    });
  });

  describe('spinner visibility', () => {
    describe('showing spinner', () => {
      test('shows spinner on registerStart', () => {
        const wrapper = setup();
        store.dispatch(actions.registerStart());
        wrapper.setProps();
        const spinner = findByTestAttr(wrapper, 'component-spinner');
        expect(spinner.exists()).toBe(true);
      });
    });

    describe('hiding spinner', () => {
      let wrapper;
      beforeEach(() => {
        const initialState = { auth: { isLoading: true } };
        wrapper = setup(initialState);
      });
      test('hides spinner on registerEnd', () => {
        store.dispatch(actions.registerEnd());
        wrapper.setProps();
        const spinner = findByTestAttr(wrapper, 'component-spinner');
        expect(spinner.exists()).toBe(false);
      });
      test('hides spinner on registerFail', () => {
        store.dispatch(actions.registerFail());
        wrapper.setProps();
        const spinner = findByTestAttr(wrapper, 'component-spinner');
        expect(spinner.exists()).toBe(false);
      });
    });
  });
});
