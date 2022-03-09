import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./../../reducers/combinedReducers";

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const formikFindByInputName = (wrapper, name) => {
  return wrapper.find(`input[name='${name}']`);
};

export const formikFindBySelectName = (wrapper, name) => {
  return wrapper.find(`select[name='${name}']`);
};

export const storeFactory = (initialState = {}) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};
