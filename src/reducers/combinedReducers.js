import { combineReducers } from "redux";

import authenticationReducer from "./authenticationReducer";
import userDataReducer from "./userDataReducer";
import postsReducer from "./postsReducer";
import chatReducer from "./chatReducer";
import navReducer from "./navReducer";

export default combineReducers({
  auth: authenticationReducer,
  userData: userDataReducer,
  posts: postsReducer,
  nav: navReducer,
  chat: chatReducer,
});
