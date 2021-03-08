import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import authenticationReducer from "./reducers/authenticationReducer";
import userDataReducer from "./reducers/userDataReducer";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  userData: userDataReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
