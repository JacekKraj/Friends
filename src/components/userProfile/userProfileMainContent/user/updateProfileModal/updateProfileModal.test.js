import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';

import UpdateProfileModal from './UpadateProfileModal';
import { storeFactory, formikFindByInputName, findByTestAttr } from '../../../../../utilities/tests/testsHelperFunctions';
import { userData } from '../../../../../utilities/tests/reduxStoreObjects';

const changeProfileImage = (wrapper) => {
  const newImage = 'newProfileImage.png';
  global.URL.createObjectURL = jest.fn(() => newImage);
  const fileInput = findByTestAttr(wrapper, 'image-file-input');
  fileInput.simulate('change', { target: { files: [newImage] } });
};

const setup = () => {
  const store = storeFactory({
    userData: {
      ...userData.userData,
      isUpdateProfileLoading: false,
    },
  });

  return mount(
    <Provider store={store}>
      <UpdateProfileModal />
    </Provider>
  );
};

describe('<UpdateProfileModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('shows personal info in inputs', () => {
    const descriptionInput = formikFindByInputName(wrapper, 'profileDescription');
    expect(descriptionInput.prop('value')).toEqual('description');
    const workInput = formikFindByInputName(wrapper, 'work');
    expect(workInput.prop('value')).toEqual('work');
    const genderInput = formikFindByInputName(wrapper, 'gender');
    expect(genderInput.prop('value')).toEqual('gender');
    const homeInput = formikFindByInputName(wrapper, 'home');
    expect(homeInput.prop('value')).toEqual('home');
  });

  test('displays defaultUserImage initially', () => {
    const profileImage = findByTestAttr(wrapper, 'profile-image');
    expect(profileImage.prop('src')).toEqual('defaultUserImage.png');
  });

  test('displays uploaded image after uploading one to file input', async () => {
    changeProfileImage(wrapper);
    const profileImage = findByTestAttr(wrapper, 'profile-image');
    expect(profileImage.prop('src')).toEqual('newProfileImage.png');
  });

  test('shows spinner after submitting personal info changes', async () => {
    const descriptionInput = formikFindByInputName(wrapper, 'profileDescription');
    await act(async () => {
      await descriptionInput.simulate('change', { target: { name: 'profileDescription', value: 'test' } });
    });

    const personalInfoSectionForm = findByTestAttr(wrapper, 'personal-info-section-form');
    await act(async () => {
      await personalInfoSectionForm.simulate('submit');
    });
    wrapper.setProps({});
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.exists()).toBeTruthy();
  });

  test('shows spinner after submitting profile image change', async () => {
    changeProfileImage(wrapper);
    const profileImageUpdateButton = findByTestAttr(wrapper, 'profile-image-update-button');
    profileImageUpdateButton.simulate('click');
    wrapper.setProps({});
    const spinner = findByTestAttr(wrapper, 'component-spinner');
    expect(spinner.exists()).toBeTruthy();
  });
});
