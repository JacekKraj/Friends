import * as actionTypes from "./../actions/actionsTypes";

const initialState = {
  email: "",
  modifiedEmail: "",
  name: "",
  dateOfBirth: {},
  profileImage: null,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEFAULT_USER_DATA:
      return {
        ...state,
        email: action.data.email,
        modifiedEmail: action.modifiedEmail,
        name: action.data.name,
        dateOfBirth: action.data.birthdayDate,
      };
    default:
      return state;
  }
};

export default userDataReducer;
