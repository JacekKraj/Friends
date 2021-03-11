import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authenticationReducer from "./../../reducers/authenticationReducer";
import userDataReducer from "./../../reducers/userDataReducer";
import postsReducer from "./../../reducers/postsReducer";

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const formikFindByInputName = (wrapper, name) => {
  return wrapper.find(`input[name='${name}']`);
};

export const formikFindBySelectName = (wrapper, name) => {
  return wrapper.find(`select[name='${name}']`);
};

const rootReducer = combineReducers({
  auth: authenticationReducer,
  userData: userDataReducer,
  posts: postsReducer,
});

export const storeFactory = (initialState = {}) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};
