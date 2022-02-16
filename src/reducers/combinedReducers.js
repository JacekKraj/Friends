import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import userDataReducer from './userDataReducer';
import modalsReducer from './modalsReducer';
import postsReducer from './postsReducer';
import chatReducer from './chatReducer';
import navReducer from './navReducer';

export default combineReducers({
  auth: authenticationReducer,
  userData: userDataReducer,
  modals: modalsReducer,
  posts: postsReducer,
  chat: chatReducer,
  nav: navReducer,
});
