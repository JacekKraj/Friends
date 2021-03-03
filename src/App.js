import React from "react";
import { Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import * as actions from "./actions/index";
import fire from "./firebaseConfig";
import AuthenticationMainPage from "./components/authentication/authenticationMainPage/AuthenticationMainPage";
import { successToast } from "./utilities/toasts/toasts";

const App = (props) => {
  toast.configure();

  React.useEffect(() => {
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        if (fire.auth().currentUser.emailVerified) {
          const fireUser = fire.auth().currentUser;
          props.onAuthenticateEnd(fireUser);
        } else {
          successToast("Verification email has been sent to your address. Verify to sing in.");
          props.onLogout();
        }
      } else {
        props.onLogout();
      }
    });
  }, []);
  let routes = (
    <Switch>
      <Route path="/" exact render={() => <AuthenticationMainPage />} />
    </Switch>
  );

  routes = props.authenticated ? "asd" : routes;

  return <div>{routes}</div>;
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticateEnd: () => dispatch(actions.authenticationEnd()),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
